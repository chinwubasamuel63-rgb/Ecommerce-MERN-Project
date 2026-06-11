import React, { useState, useContext } from "react";

import { AppContext, AppProvider } from "../src/context/AppContext";
import Toast from "../src/components/Toast";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import Home from "../src/pages/Home";
import ProductPage from "../src/pages/ProductPage";
import CartPage from "../src/pages/CartPage";
import ShopPage from "../src/pages/ShopPage";
import CheckoutPage from "../src/pages/CheckoutPage";
import AuthPage from "../src/pages/AuthPage";
import Profile from "../src/pages/Profile";
import SustainabilityPage from "../src/pages/SustainabilityPage";

function InnerApp({
  page,
  setPage,
  selectedProduct,
  setSelectedProduct,
}) {
  const { toast } = useContext(AppContext);

  return (
    <>
      <Navbar page={page} setPage={setPage} />

      {page === "home" && (
        <Home
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {page === "shop" && (
        <ShopPage
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {page === "product" && selectedProduct && (
        <ProductPage
          product={selectedProduct}
          setPage={setPage}
        />
      )}

      {page === "cart" && <CartPage setPage={setPage} />}

      {page === "checkout" && (
        <CheckoutPage setPage={setPage} />
      )}

      {page === "auth" && <AuthPage setPage={setPage} />}

      {page === "profile" && (
        <Profile setPage={setPage} />
      )}

      {page === "sustainability" && (
        <SustainabilityPage />
      )}

      <Footer setPage={setPage} />

      <Toast toast={toast} />
    </>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <AppProvider>
      <div
        style={{
          minHeight: "100vh",
          background: "#ffffff",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <InnerApp
          page={page}
          setPage={setPage}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </div>
    </AppProvider>
  );
}