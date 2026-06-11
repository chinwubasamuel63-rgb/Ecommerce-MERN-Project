import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { T } from "../data/theme";

export default function ProductPage({ product, setPage }) {
  const { addToCart, user } = useContext(AppContext);

  // Fallback array for additional images if the database entry doesn't provide them
  const imageGallery = product.images && product.images.length > 0 
    ? product.images 
    : [product.image, product.image, product.image];

  // State to manage the active main display image
  const [currentImage, setCurrentImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);

  // Sync state if the component stays mounted but the selected product changes
  useEffect(() => {
    setCurrentImage(product.image);
    setSelectedColor(product.colors[0]);
    setSelectedSize(null);
    setSizeError(false);
  }, [product]);

  function handleAdd() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    if (!user) {
      setPage("auth");
      return;
    }

    addToCart(product, selectedColor, selectedSize);
    setSizeError(false);
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <button
        onClick={() => setPage("shop")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: T.stone,
          fontSize: 14,
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "inherit",
        }}
      >
        ← Back to Shop
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        {/* Left Side: Image Gallery Gallery */}
        <div>
          <div
            style={{
              background: T.cream,
              borderRadius: 24,
              height: 440,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={currentImage || product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Thumbnail Selectors */}
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            {imageGallery.map((imgUrl, index) => (
              <div
                key={index}
                onClick={() => setCurrentImage(imgUrl)}
                style={{
                  background: T.cream,
                  borderRadius: 12,
                  height: 80,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                  border: currentImage === imgUrl ? `2px solid ${T.moss}` : `1px solid ${T.pebble}`,
                  transition: "border-color 0.2s ease",
                }}
              >
                <img
                  src={imgUrl}
                  alt={`${product.name} view ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Configuration Info */}
        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: T.moss,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            {product.category}
          </div>

          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: T.charcoal,
              marginBottom: 8,
              lineHeight: 1.1,
            }}
          >
            {product.name}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: T.charcoal,
              }}
            >
              ${product.price}
            </span>

            <span
              style={{
                fontSize: 14,
                color: T.stone,
              }}
            >
              ⭐ {product.rating} · {product.numReviews?.toLocaleString() || 0} reviews
            </span>
          </div>

          <p
            style={{
              color: T.stone,
              lineHeight: 1.7,
              fontSize: 15,
              marginBottom: 28,
            }}
          >
            {product.description}
          </p>

          {/* Color Chooser */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: T.charcoal,
                marginBottom: 10,
              }}
            >
              Color:
              <span
                style={{
                  fontWeight: 400,
                  color: T.stone,
                  marginLeft: 4,
                }}
              >
                {selectedColor}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 40,
                    border: `${selectedColor === c ? "2px" : "1px"} solid ${
                      selectedColor === c ? T.moss : T.pebble
                    }`,
                    background: selectedColor === c ? T.cream : T.white,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: T.charcoal,
                marginBottom: 10,
              }}
            >
              Size
              {sizeError && (
                <span
                  style={{
                    color: T.error,
                    fontWeight: 400,
                    marginLeft: 4,
                  }}
                >
                  — Please select a size
                </span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSelectedSize(s);
                    setSizeError(false);
                  }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    cursor: "pointer",
                    border: `${selectedSize === s ? "2px" : "1px"} solid ${
                      selectedSize === s ? T.charcoal : T.pebble
                    }`,
                    background: selectedSize === s ? T.charcoal : T.white,
                    color: selectedSize === s ? T.white : T.charcoal,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleAdd}
            style={{
              width: "100%",
              background: T.moss,
              color: T.white,
              border: "none",
              borderRadius: 40,
              padding: "16px",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Add to Cart — ${product.price}
          </button>

          <div
            style={{
              textAlign: "center",
              fontSize: 13,
              color: T.stone,
            }}
          >
            🌱 Carbon neutral shipping · 30-day returns · Made sustainably
          </div>

          {/* Material Metadata Card */}
          <div
            style={{
              marginTop: 32,
              padding: 20,
              background: T.cream,
              borderRadius: 16,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: T.charcoal,
                marginBottom: 8,
              }}
            >
              Material
            </div>

            <div
              style={{
                fontSize: 14,
                color: T.stone,
              }}
            >
              {product.material}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}