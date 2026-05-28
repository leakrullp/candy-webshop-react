import { useNavigate } from "react-router-dom";
import { getCurrentPrice } from "../../utils/priceUtils";
import type { Product } from "../../types";
import "./ProductCard.css";
import { handleAddToCart } from "../../utils/cartUtils";

interface CardProps {
  product: Product;
}

export const ProductCard = ({ product }: CardProps) => {
  const price = getCurrentPrice(product);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    localStorage.setItem("selectedProductId", product.id.toString());
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card">
      <h2>{product.name}</h2>

      <img
        src={product.image}
        width={200}
        alt={product.name}
        onClick={handleViewDetails}
      />

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

      <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
