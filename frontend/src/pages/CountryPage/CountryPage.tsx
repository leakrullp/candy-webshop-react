import { useParams } from "react-router-dom";
import { ProductGrid } from "../../components";
import type { LoadProductsProps } from "../../types";
import "./CountryPage.css";

const CountryPage = ({
  products,
  loading,
  error,
  currentUser,
}: LoadProductsProps) => {
  const { country } = useParams();
  const countryProducts = products.filter((p) => p.country === country);

  return (
    <main className="container mt-5">
      <header className="text-center mb-5"></header>
      <h2 className="display-4 fw-bold" id="welcome-header">
        Products from {country}
      </h2>
      {error && <p>{error}</p>}
      {!loading && (
        <ProductGrid
          currentUser={currentUser}
          products={countryProducts}
          filters={{
            countries: [country || ""],
            categories: [],
            discounted: false,
          }}
        />
      )}
    </main>
  );
};

export default CountryPage;
