import type { LoadProductsProps, FilterPageProps } from "../../types";
import { useState } from "react";
import { ProductGrid, FilterBox } from "../../components";
import "./ProductsPage.css";

const startingFilters: FilterPageProps = {
  countries: [],
  categories: [],
  discounted: false,
};

export default function ProductsPage({
  products,
  loading,
  error,
  currentUser,
}: LoadProductsProps) {
  const [filters, setFilters] = useState<FilterPageProps>(startingFilters);

  console.log("ProductsPage currentUser:", currentUser);

  return (
    <>
      <main className="container mt-5">
        {error && <p>{error}</p>}
        {!loading && (
          <div className="products-page">
            <FilterBox filters={filters} setFilters={setFilters} />
            <ProductGrid
              filters={filters}
              products={products}
              currentUser={currentUser}
            />
          </div>
        )}
      </main>
    </>
  );
}
