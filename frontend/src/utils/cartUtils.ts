import { addToBasket } from "../services/basketService";
import { removeFromBasket } from "../services/basketService";

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
