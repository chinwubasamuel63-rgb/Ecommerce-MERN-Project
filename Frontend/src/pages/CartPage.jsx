import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { T } from "../data/theme";

export default function CartPage({ setPage }) {
  const {
    cart,
    cartTotal,
    user,
    updateCartItem,
    removeCartItem,
  } = useContext(AppContext);

  if (cart.length === 0) return (
    <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🛒</div>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: T.charcoal, marginBottom: 12 }}>Your cart is empty</h2>
      <p style={{ color: T.stone, marginBottom: 32 }}>Looks like you haven't added anything yet.</p>
      <button onClick={() => setPage("shop")} style={{ background: T.charcoal, color: T.white, border: "none", borderRadius: 40, padding: "14px 36px", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 600 }}>Shop Now</button>
    </div>
  );

  console.log(cart);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: T.charcoal, marginBottom: 32 }}>Your Cart ({cart.reduce((s, i) => s + i.qty, 0)} items)</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 40, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {cart.map(item => {
            // Support both direct item property flat-mapping and nested product object structure
            const itemImageUrl = item.image || item.product?.image || item.img;
            
            return (
              <div key={item.key || item.cartItemId} style={{ display: "flex", gap: 20, padding: 20, background: T.white, borderRadius: 16, border: `1px solid ${T.pebble}`, alignItems: "center" }}>
                {/* Fixed Image Container */}
                <div style={{ 
                  background: T.cream, 
                  borderRadius: 12, 
                  width: 80, 
                  height: 80, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  flexShrink: 0,
                  overflow: "hidden" 
                }}>
                  <img 
                    src={itemImageUrl} 
                    alt={item.name} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover" 
                    }} 
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: T.charcoal, fontSize: 16 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: T.stone, marginTop: 2 }}>{item.selectedColor} · Size {item.selectedSize}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.charcoal, marginTop: 4 }}>${item.price}</div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button onClick={() => updateCartItem(item.cartItemId, item.qty - 1)} style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${T.pebble}`, background: T.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>−</button>
                  <span style={{ fontSize: 15, fontWeight: 600, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => updateCartItem(item.cartItemId, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${T.pebble}`, background: T.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>+</button>
                </div>
                
                <div style={{ fontWeight: 700, color: T.charcoal, minWidth: 60, textAlign: "right" }}>${(item.price * item.qty).toFixed(2)}</div>
                <button onClick={() => removeCartItem(item.cartItemId)} style={{ background: "none", border: "none", cursor: "pointer", color: T.stone, fontSize: 18, padding: 4 }}>×</button>
              </div>
            );
          })}
        </div>
        
        <div style={{ background: T.cream, borderRadius: 20, padding: 28, position: "sticky", top: 80 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: T.charcoal, marginBottom: 20 }}>Order Summary</h3>
          {cart.map(item => (
            <div key={item.key || item.cartItemId} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: T.stone, marginBottom: 8 }}>
              <span>{item.name} ×{item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${T.pebble}`, marginTop: 16, paddingTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: T.stone, marginBottom: 8 }}>
              <span>Shipping</span><span style={{ color: T.moss, fontWeight: 600 }}>Free</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, color: T.charcoal, marginTop: 8 }}>
              <span>Total</span><span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={() => user ? setPage("checkout") : setPage("auth")} style={{ width: "100%", background: T.moss, color: T.white, border: "none", borderRadius: 40, padding: "15px", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 700, marginTop: 20 }}>
            {user ? "Proceed to Checkout" : "Sign in to Checkout"}
          </button>
          <div style={{ textAlign: "center", fontSize: 12, color: T.stone, marginTop: 12 }}>🔒 Secure checkout · Free returns</div>
        </div>
      </div>
    </div>
  );
}