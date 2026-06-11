import React, { useState, useContext } from "react";
import { T } from "../data/theme";
import { AppContext } from "../context/AppContext";

export default function CheckoutPage({ setPage }) {
  const { cart, cartTotal, placeOrder, user } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [lastOrder, setLastOrder] = useState(null);

  function validate(fields) {
    const e = {};
    fields.forEach((f) => {
      if (!form[f]) e[f] = "Required";
    });
    if (form.card && !/^\d{13,19}$/.test(form.card.replace(/\s/g, "")))
      e.card = "Invalid card number";
    if (form.cvv && !/^\d{3,4}$/.test(form.cvv)) e.cvv = "Invalid CVV";
    return e;
  }

  async function nextStep() {
    const fields =
      step === 1
        ? ["name", "email", "address", "city", "zip"]
        : ["card", "expiry", "cvv"];
    const e = validate(fields);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    if (step === 2) {
      const order = await placeOrder({
        address: form.address,
        city: form.city,
        zipCode: form.zip,
      });

      if (!order) return;

      setLastOrder(order);
      setStep(3);
    } else setStep((s) => s + 1);
  }

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: `1px solid ${errors[field] ? T.error : T.pebble}`,
    fontFamily: "inherit",
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none",
    background: T.white,
  });

  if (step === 3 && lastOrder)
    return (
      <div
        style={{
          maxWidth: 560,
          margin: "80px auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: "#e8f5e9",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            margin: "0 auto 24px",
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: T.charcoal,
            marginBottom: 8,
          }}
        >
          Order Confirmed!
        </h2>
        <p style={{ color: T.stone, marginBottom: 8 }}>
          Order <strong>{lastOrder._id}</strong>
        </p>
        <p style={{ color: T.stone, marginBottom: 32 }}>
          Thank you for your purchase!
        </p>
        <div
          style={{
            background: T.cream,
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            textAlign: "left",
          }}
        >
          {lastOrder.orderItems.map((item) => (
            <div
              key={item.product}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                color: T.stone,
                marginBottom: 8,
              }}
            >
              <span>
                {item.name} ×{item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div
            style={{
              borderTop: `1px solid ${T.pebble}`,
              paddingTop: 12,
              marginTop: 8,
              fontWeight: 700,
              fontSize: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Total</span>
            <span>${lastOrder.totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={() => setPage("profile")}
            style={{
              background: T.charcoal,
              color: T.white,
              border: "none",
              borderRadius: 40,
              padding: "12px 28px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 600,
            }}
          >
            View Orders
          </button>
          <button
            onClick={() => setPage("shop")}
            style={{
              background: "none",
              border: `1px solid ${T.charcoal}`,
              borderRadius: 40,
              padding: "12px 28px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 600,
            }}
          >
            Keep Shopping
          </button>
        </div>
      </div>
    );

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ display: "flex", gap: 0, marginBottom: 40 }}>
        {["Shipping", "Payment", "Confirm"].map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background:
                  step > i ? T.moss : step === i + 1 ? T.charcoal : T.pebble,
                color: T.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                margin: "0 auto 8px",
              }}
            >
              {step > i ? "✓" : i + 1}
            </div>
            <div
              style={{
                fontSize: 13,
                color: step === i + 1 ? T.charcoal : T.stone,
                fontWeight: step === i + 1 ? 600 : 400,
              }}
            >
              {s}
            </div>
            {i < 2 && <div style={{ position: "absolute" }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: T.charcoal,
              marginBottom: 24,
            }}
          >
            Shipping Information
          </h2>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {[
              ["name", "Full Name"],
              ["email", "Email Address"],
            ].map(([f, l]) => (
              <div key={f} style={{ gridColumn: "span 2" }}>
                <label
                  style={{
                    fontSize: 13,
                    color: T.stone,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  {l}
                </label>
                <input
                  style={inputStyle(f)}
                  value={form[f]}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                />
                {errors[f] && (
                  <div style={{ fontSize: 12, color: T.error, marginTop: 4 }}>
                    {errors[f]}
                  </div>
                )}
              </div>
            ))}
            <div style={{ gridColumn: "span 2" }}>
              <label
                style={{
                  fontSize: 13,
                  color: T.stone,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Street Address
              </label>
              <input
                style={inputStyle("address")}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              {errors.address && (
                <div style={{ fontSize: 12, color: T.error, marginTop: 4 }}>
                  {errors.address}
                </div>
              )}
            </div>
            <div>
              <label
                style={{
                  fontSize: 13,
                  color: T.stone,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                City
              </label>
              <input
                style={inputStyle("city")}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              {errors.city && (
                <div style={{ fontSize: 12, color: T.error, marginTop: 4 }}>
                  {errors.city}
                </div>
              )}
            </div>
            <div>
              <label
                style={{
                  fontSize: 13,
                  color: T.stone,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                ZIP Code
              </label>
              <input
                style={inputStyle("zip")}
                value={form.zip}
                onChange={(e) => setForm({ ...form, zip: e.target.value })}
              />
              {errors.zip && (
                <div style={{ fontSize: 12, color: T.error, marginTop: 4 }}>
                  {errors.zip}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: T.charcoal,
              marginBottom: 24,
            }}
          >
            Payment
          </h2>
          <div
            style={{
              background: "#fff8e1",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 24,
              fontSize: 13,
              color: "#6d4c00",
            }}
          >
            🔒 Demo mode — use any numbers. No real charges.
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div style={{ gridColumn: "span 2" }}>
              <label
                style={{
                  fontSize: 13,
                  color: T.stone,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Card Number
              </label>
              <input
                style={inputStyle("card")}
                value={form.card}
                onChange={(e) => setForm({ ...form, card: e.target.value })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.card && (
                <div style={{ fontSize: 12, color: T.error, marginTop: 4 }}>
                  {errors.card}
                </div>
              )}
            </div>
            <div>
              <label
                style={{
                  fontSize: 13,
                  color: T.stone,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Expiry
              </label>
              <input
                style={inputStyle("expiry")}
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiry && (
                <div style={{ fontSize: 12, color: T.error, marginTop: 4 }}>
                  {errors.expiry}
                </div>
              )}
            </div>
            <div>
              <label
                style={{
                  fontSize: 13,
                  color: T.stone,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                CVV
              </label>
              <input
                style={inputStyle("cvv")}
                value={form.cvv}
                onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                placeholder="123"
                maxLength={4}
                type="password"
              />
              {errors.cvv && (
                <div style={{ fontSize: 12, color: T.error, marginTop: 4 }}>
                  {errors.cvv}
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              marginTop: 24,
              background: T.cream,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: T.charcoal,
                marginBottom: 12,
              }}
            >
              Order total: ${cartTotal.toFixed(2)}
            </div>
            {cart.map((item) => (
              <div
                key={item.key}
                style={{
                  fontSize: 13,
                  color: T.stone,
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span>
                  {item.name} ×{item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
        {step > 1 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            style={{
              flex: 1,
              background: "none",
              border: `1px solid ${T.charcoal}`,
              borderRadius: 40,
              padding: "14px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Back
          </button>
        )}
        <button
          onClick={nextStep}
          style={{
            flex: 2,
            background: T.moss,
            color: T.white,
            border: "none",
            borderRadius: 40,
            padding: "14px",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          {step === 2 ? `Place Order — $${cartTotal.toFixed(2)}` : "Continue"}
        </button>
      </div>
    </div>
  );
}
