import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductionCard";
import Hero from "../components/Hero";
import API from "../api/axios";

export default function Home({ setPage, setSelectedProduct }) {
  const [featured, setFeatured] = useState([]);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await API.get("/products");

        setFeatured(data.products.slice(0, 4));
      } catch (error) {
        console.error(
          "Failed to load featured products:",
          error
        );
      }
    };

    fetchFeaturedProducts();
  }, []);

  const { addToCart, user } =
    useContext(AppContext);

  return (
    <div>
      <Hero setPage={setPage} />

      {/* FEATURED PRODUCTS */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "72px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: 36,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <h2
            style={{
              fontSize: isMobile
                ? 28
                : 32,
              fontWeight: 800,
              color: "#1f2937",
            }}
          >
            Featured Products
          </h2>

          <button
            onClick={() =>
              setPage("shop")
            }
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6b8e23",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            View all →
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {featured.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            featured.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                setPage={setPage}
                setSelectedProduct={
                  setSelectedProduct
                }
              />
            ))
          )}
        </div>
      </div>

      {/* MATERIAL STORY */}
      <div
        style={{
          background: "#f8f5ef",
          padding: "72px 24px",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              isMobile
                ? "1fr"
                : "1fr 1fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 13,
                color: "#6b8e23",
                letterSpacing: 2,
                textTransform:
                  "uppercase",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              The Material Story
            </p>

            <h2
              style={{
                fontSize: isMobile
                  ? 32
                  : 40,
                fontWeight: 800,
                color: "#1f2937",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Nature's finest,
              <br />
              engineered.
            </h2>

            <p
              style={{
                fontSize: 16,
                color: "#78716c",
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              From ZQ-certified
              merino wool to
              TENCEL™ lyocell,
              every material is
              chosen for its low
              environmental impact
              and exceptional feel
              against your skin.
            </p>

            <button
              onClick={() =>
                setPage(
                  "sustainability"
                )
              }
              style={{
                background:
                  "#6b8e23",
                color: "#ffffff",
                border: "none",
                borderRadius: 40,
                padding:
                  "13px 32px",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Learn More
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                isMobile
                  ? "1fr"
                  : "1fr 1fr",
              gap: 16,
            }}
          >
            {[
              [
                "🐑",
                "Merino Wool",
                "Naturally regulates temperature",
              ],
              [
                "🌿",
                "Eucalyptus",
                "Silky, breathable, sustainable",
              ],
              [
                "🌊",
                "TENCEL™",
                "Responsibly sourced wood fiber",
              ],
              [
                "🦀",
                "Marine Bio",
                "ChitoSol™ odor control",
              ],
            ].map(
              ([icon, name, desc]) => (
                <div
                  key={name}
                  style={{
                    background:
                      "#ffffff",
                    borderRadius:
                      16,
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      marginBottom:
                        10,
                    }}
                  >
                    {icon}
                  </div>

                  <div
                    style={{
                      fontWeight:
                        700,
                      fontSize: 14,
                      color:
                        "#1f2937",
                      marginBottom:
                        4,
                    }}
                  >
                    {name}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color:
                        "#78716c",
                      lineHeight:
                        1.5,
                    }}
                  >
                    {desc}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}