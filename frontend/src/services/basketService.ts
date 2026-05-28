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
  window.dispatchEvent(new Event("cartUpdated"));

  return response.json();
};
