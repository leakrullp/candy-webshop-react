import { useEffect, useState } from "react";
import { calculateItemTotal } from "../../services/basketService";
import type { BasketProduct } from "../../types";
import "./BasketItem.css";

type BasketItemProps = {
  item: BasketProduct;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
};

const BasketItem = ({ item, onRemove, onUpdateQuantity }: BasketItemProps) => {
  const [quantityText, setQuantityText] = useState(String(item.quantity));

  useEffect(() => {
    setQuantityText(String(item.quantity));
  }, [item.quantity]);

  const increase = () => {
    onUpdateQuantity(item.productId, item.quantity + 1);
  };

  const decrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.productId, item.quantity - 1);
    }
  };

  const saveQuantity = () => {
    const nextQuantity = Number.parseInt(quantityText, 10);

    if (Number.isNaN(nextQuantity) || nextQuantity < 1) {
      setQuantityText(String(item.quantity));
      return;
    }

    onUpdateQuantity(item.productId, nextQuantity);
  };

  return (
    <div className="basket-item">
      <img src={item.image} alt={item.name} className="basket-img" />

      <div className="basket-info">
        <h3>{item.name}</h3>
        <p>{item.price} kr.</p>
        <p>Total: {calculateItemTotal(item).toFixed(2)} kr.</p>
      </div>
      <div className="quantity-controls">
        <button onClick={decrease}>−</button>
        <input
          className="quantity-input"
          type="number"
          min="1"
          value={quantityText}
          onChange={(event) => setQuantityText(event.target.value)}
          onBlur={saveQuantity}
        />
        <button onClick={increase}>+</button>
      </div>

      <button className="remove-btn" onClick={() => onRemove(item.productId)}>
        Remove
      </button>
    </div>
  );
};

export default BasketItem;
