import { T } from "../data/theme";

export default function Hero({ setPage }) {
  return (
    <div style={{ background: T.cream, minHeight: 560, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "80px 24px" }}>
      <p style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: T.moss, marginBottom: 16, fontWeight: 600 }}>Natural. Comfortable. Sustainable.</p>
      <h1 style={{ fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-2px", color: T.charcoal, margin: "0 0 24px", lineHeight: 1.05 }}>
        Wear the<br />
        <span style={{ color: T.moss }}>Change.</span>
      </h1>
      <p style={{ fontSize: 18, color: T.stone, maxWidth: 480, lineHeight: 1.6, marginBottom: 40 }}>
        From wool sneakers to tree-fiber flats — footwear and apparel made from nature's finest materials. Carbon neutral since day one.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={() => setPage("shop")} style={{ background: T.charcoal, color: T.white, border: "none", borderRadius: 40, padding: "14px 36px", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 600 }}>Shop Now</button>
        <button onClick={() => setPage("sustainability")} style={{ background: "transparent", color: T.charcoal, border: `2px solid ${T.charcoal}`, borderRadius: 40, padding: "14px 36px", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 600 }}>Our Mission</button>
      </div>
      <div style={{ display: "flex", gap: 48, marginTop: 64, flexWrap: "wrap", justifyContent: "center" }}>
        {[["🌱", "Carbon Neutral", "Since 2019"], ["♻️", "100% Recycled", "Packaging"], ["🐑", "ZQ Certified", "Merino Wool"], ["🌊", "90%+ Recycled", "Materials"]].map(([icon, title, sub]) => (
          <div key={title} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: T.charcoal }}>{title}</div>
            <div style={{ fontSize: 13, color: T.stone }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}