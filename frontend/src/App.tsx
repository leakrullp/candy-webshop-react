import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useProducts, useAuth } from "./hooks";
import { Navbar } from "./components";
import {
  FrontPage,
  BasketPage,
  ProductsPage,
  ProductDetailPage,
  Login,
  Register,
  CountryPage,
} from "./pages";
import { useState, useEffect } from "react";
import type { User, UserBasketItem } from "./types";

function AppContent() {
  const { products, loading, error } = useProducts();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { handleLogin, handleRegister } = useAuth(setCurrentUser);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
    if (!localStorage.getItem("localUser")) {
      localStorage.setItem("localUser", JSON.stringify({ items: [] }));
    }
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route
          path="/"
          element={
            <FrontPage
              products={products}
              loading={loading}
              error={error}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/ProductsPage"
          element={
            <ProductsPage
              products={products}
              loading={loading}
              error={error}
              currentUser={currentUser}
            />
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/cart"
          element={
            <BasketPage
              products={products}
              loading={loading}
              error={error}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="/country/:country"
          element={
            <CountryPage products={products} loading={loading} error={error} />
          }
        />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
