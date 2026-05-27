import type { Product } from "../types";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`http://localhost:3000/api/products`);
  const data = await response.json();
  return data.products;
}

export async function fetchCountries(): Promise<string[]> {
  const response = await fetch(`http://localhost:3000/api/countries`);
  const data = await response.json();
  return data.countries;
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`http://localhost:3000/api/categories`);
  const data = await response.json();
  return data.categories;
}
