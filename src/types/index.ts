// this is a product without the final "price" attribute
export interface Product {
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
  dateAdded: string; //format: YYYY-MM-DD
}

export type BasketProduct = {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export interface Data {
  products: Product[];
}
