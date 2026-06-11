import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { T } from "../data/theme";

export default function AuthPage({ setPage }) {
  const { login, register, showToast } = useContext(AppContext);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  async function handleSubmit() {
  const e = {};

  if (mode === "register" && !form.name)
    e.name = "Required";

  if (
    !form.email ||
    !/\S+@\S+\.\S+/.test(form.email)
  )
    e.email = "Valid email required";

  if (
    !form.password ||
    form.password.length < 6
  )
    e.password = "Min 6 characters";

  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }

  let ok;

  if (mode === "login") {
    ok = await login(
      form.email,
      form.password
    );
  } else {
    ok = await register(
      form.name,
      form.email,
      form.password
    );
  }

  if (ok) {
    showToast(
      `Welcome${
        mode === "register"
          ? `, ${form.name}`
          : " back"
      }! 👋`
    );

    setPage("home");
  }
}

  const inputStyle = (f) => ({ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1px solid ${errors[f] ? T.error : T.pebble}`, fontFamily: "inherit", fontSize: 15, boxSizing: "border-box", outline: "none", marginBottom: 4 });

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", background: T.cream, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: T.white, borderRadius: 24, padding: 48, width: "100%", maxWidth: 440, boxShadow: "0 2px 40px rgba(0,0,0,0.06)" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🌱</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: T.charcoal, marginBottom: 4 }}>{mode === "login" ? "Welcome back" : "Create account"}</h1>
          <p style={{ color: T.stone, fontSize: 14 }}>{mode === "login" ? "Sign in to continue shopping" : "Join the sustainable movement"}</p>
        </div>

        <div style={{ display: "flex", background: T.cream, borderRadius: 12, padding: 4, marginBottom: 28 }}>
          {["login", "register"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "9px", borderRadius: 9, background: mode === m ? T.white : "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: mode === m ? 700 : 400, color: mode === m ? T.charcoal : T.stone }}>
              {m === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {mode === "register" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T.charcoal, display: "block", marginBottom: 6 }}>Full Name</label>
            <input style={inputStyle("name")} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Alex Johnson" />
            {errors.name && <div style={{ fontSize: 12, color: T.error }}>{errors.name}</div>}
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: T.charcoal, display: "block", marginBottom: 6 }}>Email</label>
          <input style={inputStyle("email")} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" type="email" />
          {errors.email && <div style={{ fontSize: 12, color: T.error }}>{errors.email}</div>}
        </div>
        <div style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: T.charcoal, display: "block", marginBottom: 6 }}>Password</label>
          <input style={inputStyle("password")} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" placeholder="••••••••" />
          {errors.password && <div style={{ fontSize: 12, color: T.error }}>{errors.password}</div>}
        </div>
        <button onClick={handleSubmit} style={{ width: "100%", background: T.moss, color: T.white, border: "none", borderRadius: 40, padding: "15px", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700 }}>
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
        <p style={{ textAlign: "center", fontSize: 13, color: T.stone, marginTop: 20 }}>
          {mode === "login" ? "New here? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ background: "none", border: "none", cursor: "pointer", color: T.moss, fontWeight: 600, fontFamily: "inherit", fontSize: 13 }}>
            {mode === "login" ? "Create account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}