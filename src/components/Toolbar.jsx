export default function Toolbar({ isPanelOpen, setIsPanelOpen }) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 16,
          left: 20,
          height: 48,
          padding: "0 16px",
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          background: "rgba(10, 12, 16, 0.26)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.16)",
          zIndex: 40,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "rgba(255,255,255,0.94)",
            letterSpacing: "0.01em",
          }}
        >
          Rainy Studio
        </div>
      </div>

      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        aria-label="Toggle settings"
        style={{
          position: "fixed",
          top: 16,
          right: 20,
          width: 48,
          height: 48,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          background: isPanelOpen
            ? "rgba(255,255,255,0.14)"
            : "rgba(10, 12, 16, 0.26)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.16)",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          zIndex: 41,
          transition: "all 160ms ease",
        }}
      >
        ⚙️
      </button>
    </>
  );
}