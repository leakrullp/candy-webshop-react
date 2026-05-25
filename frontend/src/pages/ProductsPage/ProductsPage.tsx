import type { LoadProductsProps } from "../types";
import { useState } from "react";
import { ProductGrid, FilterBox } from "../components";

interface FilterProps {
  countries: string[];
  categories: string[];
}

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
          <>
            <FilterBox filters={filters} setFilters={setFilters} />
            <ProductGrid filters={filters} products={products} />
          </>
        )}
      </main>
    </>
  );
}
