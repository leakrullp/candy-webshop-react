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

export type LoadProductsProps = {
  products: Array<Product>;
  loading: boolean;
  error: string | null;
  currentUser: User | null;
};

export type User = {
  customerId: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  items: Array<{ productId: number; quantity: number }>;
};
