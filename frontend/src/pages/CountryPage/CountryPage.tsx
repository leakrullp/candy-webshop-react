import { useParams } from "react-router-dom";
import { ProductBanner } from "../../components";
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
      <h1 className="display-4 fw-bold" id="welcome-header">
        Products from {country}
      </h1>
      {error && <p>{error}</p>}
      {!loading && (
        <ProductBanner
          currentUser={currentUser}
          products={countryProducts}
          title={`All products from ${country}`}
          filter={() => true}
        />
      )}
    </main>
  );
};

export default CountryPage;
