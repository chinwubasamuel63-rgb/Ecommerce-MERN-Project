import React from "react";
import { T } from "../data/theme";

export default function SustainabilityPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🌍</div>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: T.charcoal, marginBottom: 16, lineHeight: 1.1 }}>Better things,<br />in a better way.</h1>
        <p style={{ fontSize: 18, color: T.stone, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>We're on a journey to reverse climate change. One shoe at a time.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginBottom: 64 }}>
        {[
          ["🌿", "Natural Materials", "We source wool, eucalyptus, sugarcane, and crab shells — materials that tread lightly on the earth and feel extraordinary on your feet."],
          ["♻️", "Carbon Footprint", "Every product has a carbon footprint label. We offset 100% of our emissions and are working to reduce them to zero."],
          ["🐑", "Animal Welfare", "Our ZQ-certified merino wool comes from farms that prioritize animal welfare, land health, and farmer wellbeing."],
          ["📦", "Packaging", "Our boxes are made from 90% recycled cardboard. Our shipping bags are compostable."],
          ["🏭", "Manufacturing", "We work with certified factories that meet strict environmental and labor standards worldwide."],
          ["🌱", "SweetFoam®", "Our midsoles are made from sugarcane — a renewable resource that actually sequesters carbon as it grows."],
        ].map(([icon, title, desc]) => (
          <div key={title} style={{ background: T.white, borderRadius: 20, padding: 28, border: `1px solid ${T.pebble}` }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: T.charcoal, marginBottom: 10 }}>{title}</h3>
            <p style={{ fontSize: 14, color: T.stone, lineHeight: 1.7 }}>{desc}</p>
          </div>
        ))}
      </div>
      <div style={{ background: T.moss, borderRadius: 24, padding: "48px 40px", color: T.white, textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>7.6 kg CO₂e</h2>
        <p style={{ fontSize: 16, opacity: 0.85 }}>Average carbon footprint per pair — vs. 14 kg industry average</p>
      </div>
    </div>
  );
}
