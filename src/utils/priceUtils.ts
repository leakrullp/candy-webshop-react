import type { Product } from "../types/index";

export const getCurrentPrice = (product: Product) => {
  const { originalPrice, discount } = product;
  if (discount > 0) {
    return originalPrice - originalPrice * (discount / 100);
  }
  return originalPrice;
};
