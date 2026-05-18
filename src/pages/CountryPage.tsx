import { useParams } from "react-router-dom";
import { ProductBanner } from "../components";
import useProducts from "../utils/useProducts";

const CountryPage = () => {
    const { country } = useParams();
    const { products, loading, error } = useProducts();
  

  const countryProducts = products.filter((p) => p.country === country);

  return (
    <main className="container mt-5">
      <header className="text-center mb-5"></header>
        <h1 className="display-4 fw-bold" id = "welcome-header">
        Products from {country}
      </h1>
      {error && <p>{error}</p>}
      {!loading && (
        <ProductBanner
          products={countryProducts}
          title={`All products from ${country}`}
          filter={() => true}
        />
      )}
    </main>
  );
};

export default CountryPage;
