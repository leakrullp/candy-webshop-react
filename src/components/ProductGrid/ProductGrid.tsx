import type { Product } from "../../types";
import { ProductCard } from "../../components";

interface ProductGridProp {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProp) {
  return (
    <main>
      <div id="products-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
