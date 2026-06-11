import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#1f2937",
        color: "#ffffff",
        padding: "48px 24px 32px",
        marginTop: 80,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 40,
            marginBottom: 40,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              🌱 Allbirds
            </div>

            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
              }}
            >
              Making the world's most comfortable
              shoes in the most sustainable way
              we know how.
            </p>
          </div>

          {[
            [
              "Shop",
              ["Shoes", "Flats", "Apparel", "Socks"],
            ],
            [
              "Company",
              [
                "About Us",
                "Sustainability",
                "Careers",
                "Press",
              ],
            ],
            [
              "Help",
              [
                "FAQ",
                "Shipping",
                "Returns",
                "Contact",
              ],
            ],
          ].map(([title, links]) => (
            <div key={title}>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                {title}
              </div>

              {links.map((link) => (
                <div
                  key={link}
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: 10,
                    cursor: "pointer",
                  }}
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop:
              "1px solid rgba(255,255,255,0.1)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            © 2026 Allbirds Demo. MERN Stack
            Project.
          </div>

          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Built with React · Express · MongoDB ·
            Node.js
          </div>
        </div>
      </div>
    </footer>
  );
}