import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getCurrentPrice } from "../../utils/priceUtils";
import type { CardProps, User } from "../../types";
import "./ProductCard.css";
import { handleAddToCart } from "../../utils/cartUtils";

export const ProductCard = ({ product, currentUser }: CardProps) => {
  const price = getCurrentPrice(product);
  const navigate = useNavigate();
  const currentUserRef = useRef<User | null>(null);

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  const handleViewDetails = () => {
    localStorage.setItem("selectedProductId", product.id.toString());
    navigate(`/products/${product.id}`);
  };

  const handleAddToCartClick = async () => {
    const user = currentUserRef.current;
    console.log("handleAddToCartClick fired, currentUser:", user);

    if (user) {
      await handleAddToCart(user, product.id);
    } else {
      const raw = localStorage.getItem("localUser");
      const localUser = raw ? JSON.parse(raw) : { items: [] };

      const existingItem = localUser.items.find(
        (item: { productId: number; quantity: number }) =>
          item.productId === product.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        localUser.items.push({ productId: product.id, quantity: 1 });
      }

      localStorage.setItem("localUser", JSON.stringify(localUser));
    }
    window.dispatchEvent(new Event("cartUpdated"));
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
      <button onClick={handleAddToCartClick}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
