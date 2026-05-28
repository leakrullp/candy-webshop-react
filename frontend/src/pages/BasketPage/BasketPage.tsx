import { useEffect, useState } from "react";
import { BasketItem } from "../../components";
import { getCurrentPrice } from "../../utils/priceUtils";
import type { BasketProduct, LoadProductsProps } from "../../types";
import {
  handleRemove,
  handleUpdateQuantity,
  removeItem,
  updateQuantity,
} from "../../utils/cartUtils";
import { calculateTotal } from "../../utils/priceUtils";
import "./BasketPage.css";
import { getBasket } from "../../services/basketService";

export default function BasketPage({
  products,
  loading,
  error,
  currentUser,
}: LoadProductsProps) {
  const [items, setItems] = useState<BasketProduct[]>([]);

  useEffect(() => {
    const loadBasket = async () => {
      const customerId = currentUser?.customerId;

      let basketData;
      if (customerId) {
        const fetchedCustomer = await getBasket(customerId);
        basketData = fetchedCustomer.basket.items;
      } else {
        const localBasket = localStorage.getItem("localUser");
        basketData = localBasket ? JSON.parse(localBasket).items : [];
      }

      const basketItems: BasketProduct[] = [];

      for (const item of basketData) {
        const product = products.find((p) => p.id === item.productId);
        if (!product) continue;

        basketItems.push({
          productId: product.id,
          name: product.name,
          price: getCurrentPrice(product),
          image: product.image,
          quantity: item.quantity,
        });
      }
      setItems(basketItems);
    };

    loadBasket();
  }, [products, currentUser]);

  const removeBasketItem = async (id: number) => {
    await handleRemove(currentUser, id);
    setItems((currentItems) => removeItem(currentItems, id));
  };

  const updateBasketQuantity = async (id: number, quantity: number) => {
    await handleUpdateQuantity(currentUser, id, quantity);
    setItems((currentItems) => updateQuantity(currentItems, id, quantity));
  };

  const total = calculateTotal(items);

  return (
    <main>
      <h1 id="basket-page-title">
        {currentUser ? `${currentUser.firstname}'s basket` : "Basket"}
      </h1>
      {error && <p>{error}</p>}
      {!loading && (
        <div id="basket-container">
          {items.length === 0 ? (
            <p>Your basket is empty.</p>
          ) : (
            <>
              {items.map((item) => (
                <BasketItem
                  key={item.productId}
                  item={item}
                  onRemove={removeBasketItem}
                  onUpdateQuantity={updateBasketQuantity}
                />
              ))}

              <h2 id="cart-sum">Total: {total.toFixed(2)} kr.</h2>
            </>
          )}
        </div>
      )}
    </main>
  );
}
