import { useEffect, useRef } from "react";
import * as twgl from "twgl.js";

const vs = `
attribute vec4 position;
varying vec2 v_uv;

void main() {
  gl_Position = position;
  v_uv = position.xy * 0.5 + 0.5;
}
`;

const fs = `
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform sampler2D iChannel0;
uniform float uRainAmount;

varying vec2 v_uv;

#define S(a, b, t) smoothstep(a, b, t)

// heart/story 逻辑去掉了
// 只保留普通雨幕 + 折射 + 轻后处理

vec3 N13(float p) {
   vec3 p3 = fract(vec3(p) * vec3(.1031,.11369,.13787));
   p3 += dot(p3, p3.yzx + 19.19);
   return fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}

float N(float t) {
    return fract(sin(t*12345.564)*7658.76);
}

float Saw(float b, float t) {
	return S(0., b, t)*S(1., b, t);
}

vec2 DropLayer2(vec2 uv, float t) {
    vec2 UV = uv;

    uv.y += t*0.75;
    vec2 a = vec2(6., 1.);
    vec2 grid = a*2.;
    vec2 id = floor(uv*grid);

    float colShift = N(id.x);
    uv.y += colShift;

    id = floor(uv*grid);
    vec3 n = N13(id.x*35.2+id.y*2376.1);
    vec2 st = fract(uv*grid)-vec2(.5, 0.);

    float x = n.x-.5;

    float y = UV.y*20.;
    float wiggle = sin(y+sin(y));
    x += wiggle*(.5-abs(x))*(n.z-.5);
    x *= .7;
    float ti = fract(t+n.z);
    y = (Saw(.85, ti)-.5)*.9+.5;
    vec2 p = vec2(x, y);

    float d = length((st-p)*a.yx);
    float mainDrop = S(.4, .0, d);

    float r = sqrt(S(1., y, st.y));
    float cd = abs(st.x-x);
    float trail = S(.23*r, .15*r*r, cd);
    float trailFront = S(-.02, .02, st.y-y);
    trail *= trailFront*r*r;

    y = UV.y;
    float trail2 = S(.2*r, .0, cd);
    float droplets = max(0., (sin(y*(1.-y)*120.)-st.y))*trail2*trailFront*n.z;
    y = fract(y*10.)+(st.y-.5);
    float dd = length(st-vec2(x, y));
    droplets = S(.3, 0., dd);

    float m = mainDrop + droplets*r*trailFront;
    return vec2(m, trail);
}

float StaticDrops(vec2 uv, float t) {
	uv *= 40.;

    vec2 id = floor(uv);
    uv = fract(uv)-.5;
    vec3 n = N13(id.x*107.45+id.y*3543.654);
    vec2 p = (n.xy-.5)*.7;
    float d = length(uv-p);

    float fade = Saw(.025, fract(t+n.z));
    float c = S(.3, 0., d) * fract(n.z*10.) * fade;
    return c;
}

vec2 Drops(vec2 uv, float t, float l0, float l1, float l2) {
    float s = StaticDrops(uv, t)*l0;
    vec2 m1 = DropLayer2(uv, t)*l1;
    vec2 m2 = DropLayer2(uv*1.85, t)*l2;

    float c = s+m1.x+m2.x;
    c = S(.3, 1., c);

    return vec2(c, max(m1.y*l0, m2.y*l1));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord.xy - .5 * iResolution.xy) / iResolution.y;
    vec2 UV = fragCoord.xy / iResolution.xy;

    float T = iTime;
    float t = T * .2;

    float rainAmount = clamp(uRainAmount, 0.0, 1.0);

    float maxBlur = mix(2.5, 5.5, rainAmount);
    float minBlur = 1.5;

    float zoom = 0.9;
    uv *= zoom;
    UV = (UV - .5) * (.96) + .5;

    float staticDrops = S(-.5, 1., rainAmount) * 2.0;
    float layer1 = S(.25, .75, rainAmount);
    float layer2 = S(.0, .5, rainAmount);

    vec2 c = Drops(uv, t, staticDrops, layer1, layer2);

    vec2 e = vec2(.001, 0.);
    float cx = Drops(uv+e, t, staticDrops, layer1, layer2).x;
    float cy = Drops(uv+e.yx, t, staticDrops, layer1, layer2).x;
    vec2 n = vec2(cx-c.x, cy-c.x);

    float focus = mix(maxBlur - c.y, minBlur, S(.1, .2, c.x));

    vec3 col = texture2D(iChannel0, UV + n * 0.75).rgb;

    float colFade = sin((T+3.) * .1) * .5 + .5;
    col *= mix(vec3(1.0), vec3(.92, .96, 1.05), colFade * 0.35);

    vec2 vignetteUV = UV - .5;
    col *= 1.0 - dot(vignetteUV, vignetteUV) * 0.6;

    col = mix(col, col * 0.92 + vec3(0.03, 0.04, 0.05), rainAmount * 0.25);

    fragColor = vec4(col, 1.0);
}

void main() {
    vec4 color;
    mainImage(color, gl_FragCoord.xy);
    gl_FragColor = color;
}
`;

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export default function RainBackgroundLayer({ imageUrl, rainAmount = 0.6 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let rafId;
    let disposed = false;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      premultipliedAlpha: false,
    });

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const programInfo = twgl.createProgramInfo(gl, [vs, fs]);
    const bufferInfo = twgl.primitives.createXYQuadBufferInfo(gl);

    let texture = twgl.createTexture(gl, {
      src: [20, 30, 28, 255],
    });

    async function initTexture() {
      try {
        const image = await loadImage(imageUrl);
        if (disposed) return;

        texture = twgl.createTexture(gl, {
          src: image,
          flipY: true,
          minMag: gl.LINEAR,
          wrap: gl.CLAMP_TO_EDGE,
        });
      } catch (err) {
        console.error("Failed to load background image for shader:", err);
      }
    }

    initTexture();

    function render(time) {
      const dpr = window.devicePixelRatio || 1;
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(programInfo.program);
      twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      twgl.setUniforms(programInfo, {
        iResolution: [canvas.width, canvas.height, 1],
        iTime: time * 0.001,
        iChannel0: texture,
        uRainAmount: rainAmount,
      });
      twgl.drawBufferInfo(gl, bufferInfo);

      rafId = requestAnimationFrame(render);
    }

    rafId = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
    };
  }, [imageUrl, rainAmount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        display: "block",
      }}
    />
  );
}