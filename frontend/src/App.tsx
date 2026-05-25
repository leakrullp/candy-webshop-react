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
import type { User } from "./types";
import data from "../../backend/data/data.json";

function AppContent() {
  const { products, loading, error } = useProducts();
  const { handleLogin, handleRegister } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkUser() {
      //hardcoded fix that sets the current user to user 1 from the data
      const user = data.baskets[0];
      setCurrentUser(user);
    }
    checkUser();
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
        <Route path="/cart" element={<BasketPage />} />
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
