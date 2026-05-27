import type { LoadProductsProps, FilterProps } from "../../types";
import { useState } from "react";
import { ProductGrid, FilterBox } from "../../components";
import "./ProductsPage.css";

const startingFilters: FilterProps = {
  countries: [],
  categories: [],
};

export default function ProductsPage({
  products,
  loading,
  error,
}: LoadProductsProps) {
  const [filters, setFilters] = useState<FilterProps>(startingFilters);

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
