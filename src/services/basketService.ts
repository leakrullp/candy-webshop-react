export type BasketProduct = {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export const calculateItemTotal = (item: BasketProduct) => {
  return item.price * item.quantity;
};


export const removeItem = (items: BasketProduct[], id: number) => {
  return items.filter((item) => item.productId !== id);
};


export const updateQuantity = (
  items: BasketProduct[],
  id: number,
  quantity: number
) => {
  return items.map((item) =>
    item.productId === id ? { ...item, quantity } : item
  );
};


export const calculateTotal = (items: BasketProduct[]) => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
};