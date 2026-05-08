import { useState, useEffect } from "react";
import type { Product } from "../../types/index";
import { ProductBanner } from "../../components/ProductBanner/ProductBanner";
import { fetchProducts } from "../../services/productsService"

export function FrontPage() {
  //states
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //useeffect hook
  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  //return
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
