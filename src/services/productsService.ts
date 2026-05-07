import data from "../data/data.json";
import type { Product } from "../types";

export const fetchProducts = async (): Promise<Product[]> => {
  return data.products;
};
