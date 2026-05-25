import type { User } from "../types";
import { addToBasket } from "../services/basketService";
import { removeFromBasket } from "../services/basketService";

export function numberOfProductsInCart(user: User | null) {
  if (!user) return 0; //needs fixing!!
  const sum = user.items.reduce((total, item) => total + item.quantity, 0);
  return sum;
}

export const handleAddToCart = async (
  productId: number,
  quantity: number = 1,
) => {
  try {
    const customerId = "1";

    await addToBasket(customerId, productId, quantity);

  } catch (error) {
    console.error(error);
    alert("Failed to add to cart");
  }
};

export const handleRemove = async (id: number) => {
  const customerId = "1";

  try {
    await removeFromBasket(customerId, id);
  } catch (e) {
    console.error(e);
  }
};

export const handleUpdateQuantity = async (id: number, quantity: number) => {
  const customerId = "1";

  try {
    await removeFromBasket(customerId, id);
    await addToBasket(customerId, id, quantity);
  } catch (e) {
    console.error(e);
  }
};
