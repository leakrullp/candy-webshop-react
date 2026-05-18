import { useEffect, useState } from "react";
import BasketItem from "../components/BasketItem";
import { fetchProducts } from "../services/productsService";
import { getCurrentPrice } from "../utils/priceUtils";
import type { BasketProduct } from "../types";
import {
  removeItem,
  updateQuantity,
  calculateTotal,
} from "../services/basketService";

export default function BasketPage() {
  const [items, setItems] = useState<BasketProduct[]>([]);

  useEffect(() => {
    const loadBasket = async () => {
      const customerId = "customer-1"; // for testing

      const basketRes = await fetch(
        `http://localhost:3000/baskets/${customerId}`
      );

      const basketData = await basketRes.json();
      const products = await fetchProducts();

      const basketItems: BasketProduct[] = [];
      for (const item of basketData.basket.items) {
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
  }, []);

  const handleRemove = (id: number) => {
    setItems((currentItems) => removeItem(currentItems, id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setItems((currentItems) => updateQuantity(currentItems, id, quantity));
  };

  const total = calculateTotal(items);

  return (
    <main>
      <h1 id="basket-page-title">Basket</h1>

      <div id="basket-container">
        {items.length === 0 ? (
          <p>Your basket is empty.</p>
        ) : (
          <>
            {items.map((item) => (
              <BasketItem
                key={item.productId}
                item={item}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}

            <h2 id="cart-sum">Total: {total.toFixed(2)} kr.</h2>
          </>
        )}
      </div>
    </main>
  );
}
