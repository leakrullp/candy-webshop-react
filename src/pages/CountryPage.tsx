import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types";
import { fetchProducts } from "../services/productsService";
import { ProductBanner } from "../components";

const CountryPage = () => {
  const { country } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
    fetchProducts()
    .then((data) => {
      console.log("Products fetched", data); 
      setProducts(data);
    })
    .catch((err) => {
      console.error("Fail:", err); 
      setError("Failed to load products");
    })
      .finally(() => setLoading(false));
  }, []);

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
