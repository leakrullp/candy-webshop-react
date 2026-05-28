import { useParams } from "react-router-dom";
import { getCurrentPrice } from "../../utils/priceUtils";
import type { LoadProductsProps } from "../../types";
import { handleAddToCart } from "../../utils/cartUtils";
import "./ProductDetailPage.css";

export default function ProductDetailPage({
  products,
  loading,
  error,
  currentUser,
}: LoadProductsProps) {
  const { id } = useParams<{ id: string }>();
  const selectedProduct = products.find((p) => String(p.id) === String(id));

  if (loading) return <div className="status-message">Loading products...</div>;
  if (error) return <div className="status-message error">Error: {error}</div>;
  if (!selectedProduct)
    return <div className="status-message">Product not found.</div>;

  const price = getCurrentPrice(selectedProduct);

  return (
    <main id="full-container">
      <img
        id="product-image"
        src={selectedProduct.image}
        alt={selectedProduct.name}
      />

      <div id="product-details-container">
        <h1 id="product-name">{selectedProduct.name}</h1>
        <h2 id="product-price">Price: {price.toFixed(2)} kr.</h2>
        <p>Country: {selectedProduct.country}</p>
        <p>Weight: {selectedProduct.weight}g</p>
        <p>Brand: {selectedProduct.brand}</p>
        <p>{selectedProduct.description}</p>
        <button
          onClick={() => handleAddToCart(currentUser, selectedProduct.id)}
          id="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
