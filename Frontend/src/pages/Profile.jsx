import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductionCard";
import { T } from "../data/theme";

export default function Profile({ setPage }) {
  const { user, orders, wishlist, products, logout } = useContext(AppContext);
  const [tab, setTab] = useState("orders");

  if (!user)
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <p style={{ color: T.stone, marginBottom: 20 }}>
          Please sign in to view your profile.
        </p>
        <button
          onClick={() => setPage("auth")}
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
          Sign In
        </button>
      </div>
    );

  // console.log("wishlist state:", wishlist);
  //     console.log("products:", products);
  // console.log("wishlist state:", wishlist);

  const wishedProducts = products.filter((p) => wishlist.includes(p._id));

  // console.log("wishedProducts:", wishedProducts);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: T.moss,
            color: T.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {user.avatar}
        </div>
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: T.charcoal,
              marginBottom: 2,
            }}
          >
            {user.name}
          </h1>
          <p style={{ color: T.stone, fontSize: 14 }}>{user.email}</p>
        </div>
        <button
          onClick={() => {
            logout();
            setPage("home");
          }}
          style={{
            marginLeft: "auto",
            background: "none",
            border: `1px solid ${T.pebble}`,
            borderRadius: 40,
            padding: "9px 20px",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 13,
            color: T.stone,
          }}
        >
          Sign Out
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 32,
          background: T.cream,
          borderRadius: 12,
          padding: 4,
          width: "fit-content",
        }}
      >
        {["orders", "wishlist", "settings"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "9px 24px",
              borderRadius: 9,
              background: tab === t ? T.white : "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: tab === t ? 700 : 400,
              color: tab === t ? T.charcoal : T.stone,
              textTransform: "capitalize",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <div>
          {orders.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "60px 0", color: T.stone }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
              <p style={{ fontSize: 18, marginBottom: 20 }}>No orders yet.</p>
              <button
                onClick={() => setPage("shop")}
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
                Shop Now
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: T.white,
                  borderRadius: 16,
                  border: `1px solid ${T.pebble}`,
                  padding: 24,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: T.charcoal,
                      }}
                    >
                      {order._id.slice(-6).toUpperCase()}
                    </div>
                    <div style={{ fontSize: 13, color: T.stone, marginTop: 2 }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span
                      style={{
                        background: order.isPaid ? "#e8f5e9" : "#fff3e0",
                        color: order.isPaid ? "#2e7d32" : "#ef6c00",
                        borderRadius: 40,
                        padding: "4px 14px",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: T.charcoal,
                      }}
                    >
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {order.orderItems.map((item) => (
                    <div
                      key={item.key}
                      style={{
                        background: T.cream,
                        borderRadius: 10,
                        padding: "8px 14px",
                        fontSize: 13,
                        color: T.stone,
                      }}
                    >
                      {item.name} ×{item.qty}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: T.stone, marginTop: 12 }}>
                  📍 {order.shippingAddress.address},
                  {order.shippingAddress.city}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "wishlist" && (
        <div>
          {wishedProducts.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "60px 0", color: T.stone }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>🤍</div>
              <p style={{ fontSize: 18 }}>
                Your wishlist is empty. Heart products to save them.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 20,
              }}
            >
              {wishedProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  setPage={setPage}
                  setSelectedProduct={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "settings" && (
        <div style={{ maxWidth: 480 }}>
          <div
            style={{
              background: T.white,
              borderRadius: 16,
              border: `1px solid ${T.pebble}`,
              padding: 28,
            }}
          >
            <h3
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: T.charcoal,
                marginBottom: 20,
              }}
            >
              Account Details
            </h3>
            {[
              ["Full Name", user.name],
              ["Email", user.email],
              ["Member Since", "June 2026"],
            ].map(([label, val]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom: `1px solid ${T.cream}`,
                }}
              >
                <span style={{ fontSize: 14, color: T.stone }}>{label}</span>
                <span
                  style={{ fontSize: 14, fontWeight: 600, color: T.charcoal }}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
