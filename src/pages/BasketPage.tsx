import { useEffect, useState } from "react";
import BasketItem from "../components/BasketItem";
import { fetchProducts, calculateDiscountedPrice } from "../services/productsService";
import { type BasketProduct, removeItem, updateQuantity, calculateTotal } from "../services/basketService";

export default function BasketPage() {
  const [items, setItems] = useState<BasketProduct[]>([]);

  useEffect(() => {
    const loadBasket = async () => {
      const products = await fetchProducts();

      const cartIds = [1, 2]; //test basket

      const basketItems: BasketProduct[] = [];
      for (const id of cartIds) {
      const product = products.find((p) => p.id === id);
      if (!product) continue;

      basketItems.push({
        productId: product.id,
        name: product.name,
        price: calculateDiscountedPrice(product),
        image: product.image,
        quantity: 1,
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

            <h2 id="cart-sum">
              Total: {total.toFixed(2)} kr.
            </h2>
          </>
        )}
      </div>
    </main>
  );
}