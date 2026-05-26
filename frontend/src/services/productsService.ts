import type { Product } from "../types";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`http://localhost:3000/api/products`);
  const data = await response.json();
  return data.products;
}
