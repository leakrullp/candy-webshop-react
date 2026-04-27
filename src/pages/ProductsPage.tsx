import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts, type Product } from "../services/productsService";
import "../index.css";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  async function loadProducts() {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    } 
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // Loading and error states
  if (loading) {
    return <div className="PageTitle">Loading products...</div>;
  } 

  if (error) {
    return <div className="PageTitle">{error}</div>;
  }


  return (
    <main>
      <div id="products-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};
