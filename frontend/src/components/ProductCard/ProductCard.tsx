import { useNavigate } from "react-router-dom";
import { getCurrentPrice } from "../../utils/priceUtils";
import type { Product } from "../../types";
import { addToBasket } from "../../services/basketService";
import "./ProductCard.css";

export const ProductCard = ({ product }: { product: Product }) => {
  const price = getCurrentPrice(product);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    localStorage.setItem("selectedProductId", product.id.toString());
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = async () => {
    try {
      const customerId = "customer-1";

      await addToBasket(customerId, product.id, 1);

      alert("Added to cart!");
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="product-card">
      <h2>{product.name}</h2>

      <img src={product.image} width={200} alt={product.name} />

      {product.discount > 0 ? (
        <>
          <p>
            <del>Old price: {product.originalPrice} kr.</del>
          </p>
          <p style={{ backgroundColor: "#ffff00" }}>
            New price {price.toFixed(2)} kr.
          </p>
        </>
      ) : (
        <p>Price: {price.toFixed(2)} kr.</p>
      )}

      <p>Country: {product.country}</p>
      <p>Brand: {product.brand}</p>

      <button onClick={handleViewDetails}>View Details</button>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
