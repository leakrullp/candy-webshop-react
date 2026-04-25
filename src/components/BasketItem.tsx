type BasketItemProps = {
  item: {
    productId: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
};

const BasketItem = ({
  item,
  onRemove,
  onUpdateQuantity,
}: BasketItemProps) => {
  const increase = () => {
    onUpdateQuantity(item.productId, item.quantity + 1);
  };

  const decrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.productId, item.quantity - 1);
    }
  };

  return (
    <div className="basket-item">
      <img
        src={item.image}
        alt={item.name}
        className="basket-img"
      />

      <div className="basket-info">
        <h3>{item.name}</h3>
        <p>{item.price} kr.</p>
        <p>Total: {(item.price * item.quantity).toFixed(2)} kr.</p>
      </div>
      <div className="quantity-controls">
          <button onClick={decrease}>−</button>
          <span>{item.quantity}</span>
          <button onClick={increase}>+</button>
      </div>
      

      <button
        className="remove-btn"
        onClick={() => onRemove(item.productId)}
      >
        Remove
      </button>
    </div>
  );
};

export default BasketItem;