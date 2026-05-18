import type { BasketProduct } from "../types";
import { addToBasket } from "../services/basketService";


export function numberOfProductsInCart() {
  let productsInCart =
    JSON.parse(localStorage.getItem("productsInCart") ?? "[]") || []; //TODO: look up how to do this safely in TS

  let number = 0;
  productsInCart.forEach(function (p: BasketProduct) {
    number += p.quantity;
  });
  return number;
}

export const handleAddToCart = async (
  productId: number,
  quantity: number = 1
) => {
  try {
    const customerId = "customer-1";

    await addToBasket(customerId, productId, quantity);

    alert("Added to cart!");
  } catch (error) {
    console.error(error);
    alert("Failed to add to cart");
  }
};
