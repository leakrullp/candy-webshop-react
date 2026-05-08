// this is temporary, needs real API implementation
import { getData } from "../utils/serverUtil";
import { getCurrentPrice } from "../utils/priceUtils";
import type { Product } from "../types/index";

interface Data {
  products: Product[];
}

const data: Data | null = getData();
//const stringData: string = JSON.stringify(data);

export function getProducts() {
  if (!data) {
    return [];
  }
  const products = data.products.map((p: Product) => ({
    ...p,
    price: getCurrentPrice(p),
  }));

  return products;
}
