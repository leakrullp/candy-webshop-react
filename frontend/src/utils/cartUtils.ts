import { addToBasket, removeFromBasket } from "../services/basketService";
import type { User, BasketProduct } from "../types";

export const calculateItemTotal = (item: BasketProduct) => {
  return item.price * item.quantity;
};

export const calculateTotal = (items: BasketProduct[]) => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
};

export const removeItem = (items: BasketProduct[], id: number) => {
  return items.filter((item) => item.productId !== id);
};

export const updateQuantity = (
  items: BasketProduct[],
  id: number,
  quantity: number,
) => {
  return items.map((item) =>
    item.productId === id ? { ...item, quantity } : item,
  );
};

export const handleAddToCart = async (
  currentUser: User,
  productId: number,
  quantity: number = 1,
) => {
  try {
    if (currentUser?.customerId) {
      await addToBasket(currentUser.customerId, productId, quantity);
    } else {
      const raw = localStorage.getItem("localUser");
      const localUser = raw ? JSON.parse(raw) : { items: [] };

      const existingItem = localUser.items.find(
        (item: { productId: number; quantity: number }) =>
          item.productId === productId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        localUser.items.push({ productId, quantity });
      }

      localStorage.setItem("localUser", JSON.stringify(localUser));

      window.dispatchEvent(new Event("cartUpdated"));
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Failed to add to cart");
  }
};

export const handleRemove = async (currentUser: User | null, id: number) => {
  try {
    if (currentUser?.customerId) {
      await removeFromBasket(currentUser.customerId, id);
    } else {
      const raw = localStorage.getItem("localUser");
      if (raw) {
        const localUser = JSON.parse(raw);
        localUser.items = localUser.items.filter(
          (item: { productId: number }) => item.productId !== id,
        );
        localStorage.setItem("localUser", JSON.stringify(localUser));
        window.dispatchEvent(new Event("cartUpdated"));
      }
    }
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

export const handleUpdateQuantity = async (
  currentUser: User | null,
  id: number,
  quantity: number,
) => {
  try {
    if (currentUser?.customerId) {
      await removeFromBasket(currentUser.customerId, id);
      await addToBasket(currentUser.customerId, id, quantity);
    } else {
      const raw = localStorage.getItem("localUser");
      const localUser = raw ? JSON.parse(raw) : { items: [] };

      const itemIndex = localUser.items.findIndex(
        (item: { productId: number }) => item.productId === id,
      );

      if (itemIndex !== -1) {
        localUser.items[itemIndex] = { productId: id, quantity: quantity };
      } else {
        localUser.items.push({ productId: id, quantity: quantity });
      }

      localStorage.setItem("localUser", JSON.stringify(localUser));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};
