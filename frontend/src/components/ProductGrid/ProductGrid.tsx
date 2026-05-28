import type { Product, User } from "../../types";
import { ProductCard } from "..";
import "./ProductGrid.css";

interface ProductGridProp {
  products: Product[];
  filters: { countries: string[]; categories: string[]; discounted: boolean };
  currentUser: User | null;
}

export default function ProductGrid({
  products,
  filters,
  currentUser,
}: ProductGridProp) {
  const filtered = products.filter((p) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(p.category);

    const matchesCountry =
      filters.countries.length === 0 || filters.countries.includes(p.country);

    const matchesDiscount =
      !filters.discounted || (p.discount !== undefined && p.discount > 0);

    return matchesCategory && matchesCountry && matchesDiscount;
  });

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
