import type { Product, BasketProduct } from "../types";

export const getCurrentPrice = (product: Product) => {
  const { originalPrice, discount } = product;
  if (discount > 0) {
    return originalPrice - originalPrice * (discount / 100);
  }
  return originalPrice;
};

export const calculateItemTotal = (item: BasketProduct) => {
  return item.price * item.quantity;
};

export const calculateTotal = (items: BasketProduct[]) => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
};
