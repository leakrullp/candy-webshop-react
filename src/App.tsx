import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./index.css";
import ProductCard from "./components/ProductCard";
import BasketItem from "./components/BasketItem";
import { type Product } from "./services/productsService";

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
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
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
    </>
  );
}

export default App;
