import { useState } from "react";
import Toolbar from "./components/Toolbar";
import EditorPanel from "./components/EditorPanel";
import ScenePanel from "./components/ScenePanel";
import RainBackgroundLayer from "./components/RainBackgroundLayer";

export default function App() {
  const [content, setContent] = useState("");
  const [fontFamily, setFontFamily] = useState("serif");
  const [fontSize, setFontSize] = useState(20);

  const [background, setBackground] = useState("Rainy Forest");
  const [rainIntensity, setRainIntensity] = useState(50);

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const backgroundImages = {
    "Rainy Forest": "/backgrounds/rainy-forest.jpg",
    "Rainy Room": "/backgrounds/rainy-room.jpg",
    "Rainy Lake": "/backgrounds/rainy-lake.jpg",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        color: "white",
        background: "#0b1014",
      }}
    >
      <RainBackgroundLayer
        imageUrl={backgroundImages[background]}
        rainAmount={rainIntensity / 100}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background: "rgba(6, 14, 12, 0.10)",
          pointerEvents: "none",
        }}
      />

      <Toolbar
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
      />

      <EditorPanel
        content={content}
        setContent={setContent}
        fontFamily={fontFamily}
        fontSize={fontSize}
      />

      {isPanelOpen && (
        <ScenePanel
          background={background}
          setBackground={setBackground}
          rainIntensity={rainIntensity}
          setRainIntensity={setRainIntensity}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      )}
    </div>
  );
}