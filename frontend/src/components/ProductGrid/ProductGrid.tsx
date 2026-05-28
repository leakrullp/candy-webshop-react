import type { Product, User } from "../../types";
import { ProductCard } from "..";
import "./ProductGrid.css";

interface ProductGridProp {
  products: Product[];
  filters: { countries: string[]; categories: string[] };
  currentUser: User | null;
}

export default function ProductGrid({
  products,
  filters,
  currentUser,
}: ProductGridProp) {
  const noFiltersChecked =
    filters.categories.length === 0 && filters.countries.length === 0;

  const filtered = noFiltersChecked
    ? products
    : products.filter(
        (p) =>
          filters.categories.includes(p.category) ||
          filters.countries.includes(p.country),
      );

  return (
    <main>
      <div id="products-container">
        {filtered.length === 0 && <h2>No products found</h2>}
        {filtered.map((product) => (
          <ProductCard
            currentUser={currentUser}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}
