import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { T } from "../data/theme";

export default function ProductCard({ product, setPage, setSelectedProduct }) {
  const { wishlist, toggleWishlist, user } = useContext(AppContext);
  const wished = wishlist.includes(product._id);
  return (
    <div
      style={{
        background: T.white,
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${T.pebble}`,
        cursor: "pointer",
        transition: "transform 0.2s",
        position: "relative",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {product.tag && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: T.moss,
            color: T.white,
            borderRadius: 40,
            padding: "4px 12px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          {product.tag}
        </div>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (user) toggleWishlist(product._id);
        }}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "white",
          border: `1px solid ${T.pebble}`,
          borderRadius: "50%",
          width: 34,
          height: 34,
          cursor: "pointer",
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {wished ? "❤️" : "🤍"}
      </button>
      <div
        onClick={() => {
          setSelectedProduct(product);
          setPage("product");
        }}
        style={{
          height: 200,
          overflow: "hidden",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{ padding: "16px 20px 20px" }}
        onClick={() => {
          setSelectedProduct(product);
          setPage("product");
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: T.stone,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 4,
          }}
        >
          {product.category}
        </div>
        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: T.charcoal,
            marginBottom: 4,
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            fontSize: 13,
            color: T.stone,
            marginBottom: 12,
            lineHeight: 1.5,
          }}
        >
          {product.material}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 700, color: T.charcoal }}>
            ${product.price}
          </span>
          <span style={{ fontSize: 13, color: T.stone }}>
            ⭐ {product.rating} ({(product.newReviews || 0).toLocaleString()})
          </span>
        </div>
        <div
          style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}
        >
          {product.colors.slice(0, 3).map((c) => (
            <span
              key={c}
              style={{
                fontSize: 11,
                background: T.cream,
                border: `1px solid ${T.pebble}`,
                borderRadius: 20,
                padding: "3px 10px",
                color: T.stone,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
