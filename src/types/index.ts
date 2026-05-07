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

export interface Data {
  products: Product[];
}
