import { useState, useEffect } from "react";
import type { Product } from "../types";
import { fetchProducts } from "../services/productsService";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};

export default useProducts;