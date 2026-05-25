import type { BasketProduct } from "../types";

export const calculateItemTotal = (item: BasketProduct) => {
  return item.price * item.quantity;
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

export const calculateTotal = (items: BasketProduct[]) => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
};

export const getBasket = async (customerId: string) => {
  const url = `http://localhost:3000/api/baskets/${customerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch basket");
  }

  return response.json();
};

export const addToBasket = async (
  customerId: string,
  productId: number,
  quantity: number = 1,
) => {
  const url = `http://localhost:3000/api/baskets/${customerId}/${productId}/${quantity}`;

  const response = await fetch(url, {
    method: "POST",
  });

  console.log("STATUS:", response.status);

  const text = await response.text();
  console.log("BODY:", text);

  if (!response.ok) {
    throw new Error("Failed to add item to basket");
  }
  // tell navbar to refresh the number of items in the basket
  window.dispatchEvent(new Event("cartUpdated"));

  return JSON.parse(text);
};

export const removeFromBasket = async (
  customerId: string,
  productId: number,
) => {
  const url = `http://localhost:3000/api/baskets/${customerId}/${productId}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove item from basket");
  }
  // tell navbar to refresh the number of items in the basket
  window.dispatchEvent(new Event("cartUpdated"));


  return response.json();
};
