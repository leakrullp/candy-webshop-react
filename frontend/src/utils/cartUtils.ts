import type { User } from "../types";
import { addToBasket } from "../services/basketService";

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

    alert("Added to cart!");
  } catch (error) {
    console.error(error);
    alert("Failed to add to cart");
  }
};
