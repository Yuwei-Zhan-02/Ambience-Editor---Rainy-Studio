export default function BackgroundLayer({ background }) {
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
        zIndex: 0,
        backgroundImage: `url(${backgroundImages[background]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "blur(1.5px) brightness(0.88) saturate(0.98)",
        transform: "scale(1.03)",
      }}
    />
  );
}