import { useState, useEffect } from "react";
import type { Product } from "../../types";
import { ProductBanner } from "../../components";
import { fetchProducts } from "../../services/productsService";
import Carousel from "../../components/Carousel";
import useDisplayName from "../../utils/useDisplayName";


export default function FrontPage() {
  //fetch all products once for this page instead of once per ProductBanner
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const name = useDisplayName();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
    <main className="container mt-5"></main>
      {error && <p>{error}</p>}
      {!loading && (
        <>
        <header className="text-center mb-5"></header>
        <h1 className="display-4 fw-bold" id = "welcome-header">{name ? `Welcome to a world of candy, ${name}!!` : "Welcome to a world of candy"}</h1>
  
        <Carousel />
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
    </>
  );
}
