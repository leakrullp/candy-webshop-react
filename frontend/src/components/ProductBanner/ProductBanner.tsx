import { Link } from "react-router-dom";
import { ProductGrid } from "../index";
import type { Product, FilterPageProps, User } from "../../types";
import "./ProductBanner.css";

type Props = {
  title: string;
  products: Product[];
  currentUser: User | null;
  filter?: (item: Product) => boolean;
};

const startingFilters: FilterPageProps = {
  countries: [],
  categories: [],
  discounted: false,
};

export default function ProductBanner({
  title,
  products,
  currentUser,
  filter = () => true,
}: Props) {
  const filtered = products.filter(filter);
  const displayedProducts = filtered.slice(0, 4);

  return (
    <div className="product-banner">
      <div className="d-flex justify-content-between">
        <h2 className="product-banner-title">{title}</h2>

        <Link to="/ProductsPage">See all items</Link>
      </div>
      <div className="cards-container">
        <ProductGrid
          currentUser={currentUser}
          filters={startingFilters}
          products={displayedProducts}
        />
      </div>
    </div>
  );
}
