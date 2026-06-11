import React from "react";
import { T } from "../data/theme";

export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", background: T.charcoal, color: T.white, padding: "12px 24px", borderRadius: 40, fontSize: 14, zIndex: 9999, whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
      {toast.msg}
    </div>
  );
}

