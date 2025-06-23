import { useState } from "react";

export default function Home() {
  const [digit, setDigit] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cambia aquí la URL a tu backend en Render
  const BACKEND_URL = "https://mnist-backend-ajab.onrender.com";

  async function generate() {
    setLoading(true);
    setImages([]);
    const res = await fetch(`${BACKEND_URL}/generate?digit=${digit}&n=5`);
    const data = await res.json();
    setImages(data.images);
    setLoading(false);
  }

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Handwritten Digit Generator</h1>
      <label>
        Choose a digit (0-9):{" "}
        <input
          type="number"
          min="0"
          max="9"
          value={digit}
          onChange={(e) => setDigit(Number(e.target.value))}
        />
      </label>
      <button onClick={generate} style={{ marginLeft: 16 }}>
        Generate
      </button>
      {loading && <p>Loading...</p>}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        {images.map((b64, idx) => (
          <img
            key={idx}
            src={`data:image/png;base64,${b64}`}
            alt={`digit-sample-${idx}`}
            width={56}
            height={56}
            style={{ margin: "0 8px", border: "1px solid #ddd" }}
          />
        ))}
      </div>
    </div>
  );
}
