import { useState } from "react";
import "./index.css";
import ProductCard from "./components/ProductCard";
import BasketItem from "./components/BasketItem";
import ProductsPage from "./pages/ProductsPage";
import { type Product } from "./services/productsService";
import BasketPage from "./pages/BasketPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  const [count, setCount] = useState(0);
  const exampleProduct: Product = {
    id: 1,
    name: "Test Coffee",
    image: "https://via.placeholder.com/200",
    originalPrice: 50,
    discount: 20,
    country: "Brazil",
    brand: "Test Brand",
    description: "Test coffee description",
    weight: 250,
    color: ["Brown"],
    category: "Coffee",
    allergies: [],
    dateAdded: "2026-01-01",
  };

  const exampleBasketItem = {
    productId: 1,
    name: "Test Coffee",
    price: 40,
    image: "https://via.placeholder.com/100",
    quantity: 2,
  };

  localStorage.setItem("selectedProductId", "1");
  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
      <section>
      <h2>Test Components</h2>

      <h3>ProductCard</h3>
      <ProductCard product={exampleProduct} />

      <h3>BasketItem</h3>
      <BasketItem
        item={exampleBasketItem}
        onRemove={() => {}}
        onUpdateQuantity={() => {}}
      />
    </section>
    <section>
      <h2>Products Page Test</h2>
      <ProductsPage />
    </section>
    <section>
      <h2>Basket Page Test</h2>
      <BasketPage />
    </section>
    <section>
      <h2>Product Detail Page Test</h2>
      <ProductDetailPage />
    </section>
    </>
  );
}

export default App;
