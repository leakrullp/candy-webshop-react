import data from "../data/data.json";

export type Product = {
  id: number;
  originalPrice: number;
  name: string;
  image: string;
  country: string;
  description: string;
  weight: number;
  color: string[];
  discount: number;
  brand: string;
  category: string;
  allergies: string[];
  dateAdded: string;
};

export const calculateDiscountedPrice = (product: Product): number => {
  if (product.discount <= 0) {
    return product.originalPrice;
  } else {
    return product.originalPrice * (1 - product.discount / 100);
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  return data.products;
};
