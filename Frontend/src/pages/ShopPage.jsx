import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductionCard";
import { CATEGORIES } from "../data/products";
import { T } from "../data/theme";
import API from "../api/axios";

export default function ShopPage({
  setPage,
  setSelectedProduct,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState(200);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");

        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
          fontSize: "18px",
        }}
      >
        Loading products...
      </div>
    );
  }

  let filtered = products
    .filter(
      (p) =>
        category === "All" ||
        p.category === category
    )
    .filter(
      (p) =>
        p.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        p.material
          .toLowerCase()
          .includes(search.toLowerCase())
    )
    .filter((p) => p.price <= priceRange);

  if (sort === "price-asc") {
    filtered = [...filtered].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "price-desc") {
    filtered = [...filtered].sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "rating") {
    filtered = [...filtered].sort(
      (a, b) => b.rating - a.rating
    );
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 24px",
      }}
    >
      <h1
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: T.charcoal,
          marginBottom: 8,
        }}
      >
        Shop All
      </h1>

      <p
        style={{
          color: T.stone,
          marginBottom: 36,
        }}
      >
        {filtered.length} products
      </p>

      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 32,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            minWidth: 200,
          }}
        >
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search products…"
            style={{
              width: "100%",
              padding: "10px 16px 10px 40px",
              borderRadius: 40,
              border: `1px solid ${T.pebble}`,
              fontFamily: "inherit",
              fontSize: 14,
              background: T.white,
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: T.stone,
            }}
          >
            🔍
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                background:
                  category === c
                    ? T.charcoal
                    : T.white,
                color:
                  category === c
                    ? T.white
                    : T.charcoal,
                border: `1px solid ${
                  category === c
                    ? T.charcoal
                    : T.pebble
                }`,
                borderRadius: 40,
                padding: "8px 18px",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight:
                  category === c ? 600 : 400,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          style={{
            padding: "9px 14px",
            borderRadius: 40,
            border: `1px solid ${T.pebble}`,
            fontFamily: "inherit",
            fontSize: 13,
            background: T.white,
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="default">
            Sort: Featured
          </option>
          <option value="price-asc">
            Price: Low to High
          </option>
          <option value="price-desc">
            Price: High to Low
          </option>
          <option value="rating">
            Top Rated
          </option>
        </select>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            minWidth: 180,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: T.stone,
              whiteSpace: "nowrap",
            }}
          >
            Max ${priceRange}
          </span>

          <input
            type="range"
            min={50}
            max={200}
            value={priceRange}
            onChange={(e) =>
              setPriceRange(+e.target.value)
            }
            style={{ flex: 1 }}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 0",
            color: T.stone,
          }}
        >
          <div
            style={{
              fontSize: 48,
              marginBottom: 16,
            }}
          >
            🔍
          </div>

          <p
            style={{
              fontSize: 18,
            }}
          >
            No products match your search.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            style={{
              marginTop: 16,
              background: T.charcoal,
              color: T.white,
              border: "none",
              borderRadius: 40,
              padding: "10px 24px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {filtered.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              setPage={setPage}
              setSelectedProduct={
                setSelectedProduct
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}