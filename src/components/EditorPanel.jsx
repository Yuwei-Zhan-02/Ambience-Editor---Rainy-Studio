export default function EditorPanel({
  content,
  setContent,
  fontFamily,
  fontSize,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 72,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "44px 24px 28px",
        boxSizing: "border-box",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "min(920px, 100%)",
          height: "calc(100vh - 72px - 72px)",
          position: "relative",
          borderRadius: 28,
          overflow: "hidden",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(18, 16, 18, 0.24)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.18)",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            padding: "72px 72px 64px",
            resize: "none",
            background: "transparent",
            color: "white",
            border: "none",
            outline: "none",
            boxShadow: "none",
            fontFamily,
            fontSize: `${fontSize}px`,
            lineHeight: 1.9,
            overflowY: "auto",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}