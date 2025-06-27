import { useState } from "react";

export default function Home() {
  const [digit, setDigit] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = "https://mnist-backend-ajab.onrender.com";

  async function generate() {
    setError("");
    setLoading(true);
    setImages([]);
    try {
      const res = await fetch(`${BACKEND_URL}/generate?digit=${digit}&n=5`);
      if (!res.ok) throw new Error("Backend error. Try again later.");
      const data = await res.json();
      setImages(data.images);
    } catch (e) {
      setError("Failed to generate images. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3f4f6 0%, #dbeafe 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px #0001",
          padding: "40px 32px",
          width: 340,
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: 12, fontWeight: 700, fontSize: 26 }}>
          Handwritten Digit Generator
        </h1>
        <p style={{ color: "#64748b", fontSize: 15, marginBottom: 20 }}>
          Generate MNIST-style images for any digit from 0 to 9.
        </p>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 15 }}>
            Choose a digit (0-9):{" "}
            <input
              type="number"
              min="0"
              max="9"
              value={digit}
              disabled={loading}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 0 && val <= 9) setDigit(val);
              }}
              style={{
                width: 60,
                fontSize: 16,
                padding: "4px 10px",
                border: "1px solid #d1d5db",
                borderRadius: 6,
                marginRight: 10,
              }}
            />
          </label>
          <button
            onClick={generate}
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "7px 20px",
              fontWeight: 600,
              fontSize: 15,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.65 : 1,
              boxShadow: "0 2px 8px #2563eb20",
              marginLeft: 4,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {loading && (
          <div style={{ margin: "16px 0" }}>
            <div
              style={{
                margin: "0 auto",
                border: "3px solid #d1d5db",
                borderTop: "3px solid #2563eb",
                borderRadius: "50%",
                width: 30,
                height: 30,
                animation: "spin 1s linear infinite",
                marginBottom: 10,
              }}
            />
            <p style={{ color: "#2563eb" }}>Please wait, generating images...</p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg);}
                100% {transform: rotate(360deg);}
              }
            `}</style>
          </div>
        )}

        {error && (
          <p style={{ color: "#dc2626", marginBottom: 18 }}>{error}</p>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          {images.map((b64, idx) => (
            <img
              key={idx}
              src={`data:image/png;base64,${b64}`}
              alt={`digit-sample-${idx}`}
              width={56}
              height={56}
              style={{
                margin: "0 8px",
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                background: "#f9fafb",
              }}
            />
          ))}
        </div>

        <div style={{ marginTop: 36, fontSize: 13, color: "#64748b" }}>
          <span style={{ fontWeight: 500 }}>
            Please keep in mind that the model can take up to 5 minutes to create the images successfully.
          </span>
        </div>
      </div>
    </div>
  );
}
