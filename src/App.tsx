import { useState, useEffect } from "react";
import "./index.css";
import ProductsPage from "./pages/ProductsPage";
import BasketPage from "./pages/BasketPage";
import Navbar from "./components/Navbar/Navbar";
import { ProductBanner } from "./components/ProductBanner/ProductBanner";
import { fetchProducts } from "./services/productsService";
import type { Product } from "../src/types/index";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  console.log("Fetched products", products);

  return (
    <>
      <Navbar />
      {error && <p>{error}</p>}
      {!loading && (
        <>
          <ProductBanner
            products={products}
            title="On sale"
            filter={(p) => p.discount > 0}
          />
          <ProductBanner
            products={products}
            title="Danish products"
            filter={(p) => p.country === "Denmark"}
          />
        </>
      )}
      <section>
        <h2>Products Page Test</h2>
        <ProductsPage />
      </section>
      <section>
        <h2>Basket Page Test</h2>
        <BasketPage />
      </section>
    </>
  );
}

export default App;
