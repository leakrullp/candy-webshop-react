import type { Product } from "../../types";
import { ProductCard } from "..";
import "./ProductGrid.css";

interface ProductGridProp {
  products: Product[];
  filters: { countries: string[]; categories: string[] };
}

export default function ProductGrid({ products, filters }: ProductGridProp) {
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
