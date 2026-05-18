import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productsService";
import type { Product } from "../types";
import "../index.css";
import { ProductGrid, FilterBox } from "../components";

interface FilterProps {
  countries: string[];
  categories: string[];
}

const startingFilters: FilterProps = {
  countries: [],
  categories: [],
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterProps>(startingFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProducts() {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // Loading and error states
  if (loading) {
    return <div className="PageTitle">Loading products...</div>;
  }

  if (error) {
    return <div className="PageTitle">{error}</div>;
  }

  return (
    <>
      <main className="container mt-5">
        <FilterBox filters={filters} setFilters={setFilters} />
        <ProductGrid filters={filters} products={products} />
      </main>
    </>
  );
}
