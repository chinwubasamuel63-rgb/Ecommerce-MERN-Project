import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Navbar({
  page,
  setPage,
}) {
  const { user, logout, cartCount } =
    useContext(AppContext);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const isMobile = window.innerWidth < 768;

  return (
    <nav
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <button
          onClick={() => {
            setPage("home");
            setMenuOpen(false);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: isMobile ? 18 : 20,
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          🌱 Allbirds
        </button>

        {/* DESKTOP MENU */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              gap: 32,
              alignItems: "center",
            }}
          >
            {[
              "home",
              "shop",
              "sustainability",
            ].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 14,
                  color:
                    page === p
                      ? "#1f2937"
                      : "#78716c",
                  fontWeight:
                    page === p ? 600 : 400,
                  textTransform: "capitalize",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* RIGHT SIDE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 10 : 16,
          }}
        >
          {/* MOBILE MENU BUTTON */}
          {isMobile && (
            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 24,
              }}
            >
              ☰
            </button>
          )}

          {/* USER */}
          {user ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <button
                onClick={() =>
                  setPage("profile")
                }
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#6b8e23",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {user.avatar}
              </button>

              {!isMobile && (
                <button
                  onClick={logout}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#78716c",
                  }}
                >
                  Sign out
                </button>
              )}
            </div>
          ) : (
            !isMobile && (
              <button
                onClick={() =>
                  setPage("auth")
                }
                style={{
                  background: "none",
                  border:
                    "1px solid #1f2937",
                  borderRadius: 40,
                  padding: "7px 18px",
                  cursor: "pointer",
                }}
              >
                Sign in
              </button>
            )
          )}

          {/* CART */}
          <button
            onClick={() =>
              setPage("cart")
            }
            style={{
              position: "relative",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 8px",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1f2937"
              strokeWidth="1.8"
            >
              <circle
                cx="9"
                cy="21"
                r="1"
              />
              <circle
                cx="20"
                cy="21"
                r="1"
              />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "#6b8e23",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  fontSize: 11,
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  fontWeight: 700,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobile && menuOpen && (
        <div
          style={{
            borderTop:
              "1px solid #e5e7eb",
            background: "#ffffff",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <button
            onClick={() => {
              setPage("home");
              setMenuOpen(false);
            }}
            style={{
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Home
          </button>

          <button
            onClick={() => {
              setPage("shop");
              setMenuOpen(false);
            }}
            style={{
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Shop
          </button>

          <button
            onClick={() => {
              setPage("sustainability");
              setMenuOpen(false);
            }}
            style={{
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Sustainability
          </button>

          {!user && (
            <button
              onClick={() => {
                setPage("auth");
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Sign In
            </button>
          )}

          {user && (
            <>
              <button
                onClick={() => {
                  setPage("profile");
                  setMenuOpen(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                Profile
              </button>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: 16,
                  color: "#dc2626",
                }}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}