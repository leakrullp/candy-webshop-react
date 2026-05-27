import type { LoadProductsProps, FilterPageProps } from "../../types";
import { useState } from "react";
import { ProductGrid, FilterBox } from "../../components";
import "./ProductsPage.css";

const startingFilters: FilterPageProps = {
  countries: [],
  categories: [],
};

export default function ProductsPage({
  products,
  loading,
  error,
}: LoadProductsProps) {
  const [filters, setFilters] = useState<FilterPageProps>(startingFilters);

  return (
    <>
      <main className="container mt-5">
        {error && <p>{error}</p>}
        {!loading && (
          <div className="products-page">
            <FilterBox filters={filters} setFilters={setFilters} />
            <ProductGrid filters={filters} products={products} />
          </div>
        )}
      </main>
    </>
  );
}
