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

function AppContent() {
  const { products, loading, error } = useProducts();
  const { handleLogin, handleRegister } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <FrontPage products={products} loading={loading} error={error} />
          }
        />
        <Route
          path="/ProductsPage"
          element={
            <ProductsPage products={products} loading={loading} error={error} />
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
