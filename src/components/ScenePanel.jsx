export default function ScenePanel({
  background,
  setBackground,
  rainIntensity,
  setRainIntensity,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
}) {
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    fontSize: 12,
    color: "rgba(255,255,255,0.58)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  };

  const inputWrapStyle = {
    marginBottom: 18,
  };

  const selectStyle = {
    width: "100%",
    height: 42,
    borderRadius: 12,
    padding: "0 12px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 84,
        right: 20,
        width: 320,
        padding: 18,
        borderRadius: 22,
        background: "rgba(12, 14, 18, 0.46)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.22)",
        zIndex: 50,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "rgba(255,255,255,0.92)",
          marginBottom: 16,
        }}
      >
        Settings
      </div>

      <div style={inputWrapStyle}>
        <label style={labelStyle}>Background</label>
        <select
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          style={selectStyle}
        >
          <option value="Rainy Forest">Rainy Forest</option>
          <option value="Rainy Room">Rainy Room</option>
          <option value="Rainy Lake">Rainy Lake</option>
        </select>
      </div>

      <div style={inputWrapStyle}>
        <label style={labelStyle}>Rain Intensity</label>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="range"
            min="0"
            max="100"
            value={rainIntensity}
            onChange={(e) => setRainIntensity(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <span
            style={{
              width: 30,
              fontSize: 12,
              color: "rgba(255,255,255,0.72)",
              textAlign: "right",
            }}
          >
            {rainIntensity}
          </span>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.08)",
          margin: "14px 0 18px",
        }}
      />

      <div style={inputWrapStyle}>
        <label style={labelStyle}>Font</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          style={selectStyle}
        >
          <option value="serif">Serif</option>
          <option value="sans-serif">Sans Serif</option>
          <option value="monospace">Monospace</option>
          <option value="'Georgia', serif">Georgia</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
        </select>
      </div>

      <div style={inputWrapStyle}>
        <label style={labelStyle}>Font Size</label>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="range"
            min="12"
            max="32"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <span
            style={{
              width: 42,
              fontSize: 12,
              color: "rgba(255,255,255,0.72)",
              textAlign: "right",
            }}
          >
            {fontSize}px
          </span>
        </div>
      </div>
    </div>
  );
}