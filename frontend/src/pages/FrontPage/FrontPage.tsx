import { useState, useEffect } from "react";
import type { Product } from "../../types";
import { ProductBanner } from "../../components";
import { fetchProducts } from "../../services/productsService";

export default function FrontPage() {
  //fetch all products once for this page instead of once per ProductBanner
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
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
    </>
  );
}
