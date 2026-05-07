import "./index.css";
import ProductsPage from "./pages/ProductsPage";
import BasketPage from "./pages/BasketPage";
import Navbar from "./components/Navbar/Navbar";
import { fetchProducts } from "./services/productsService";
import type { Product } from "../src/types/index";

const products: Promise<Product[]> = fetchProducts();

function App() {
  return (
    <>
      <Navbar />
      <section>
        <h2>Products Page Test</h2>
        <ProductsPage />
      </section>
      <section>
        <h2>Basket Page Test</h2>
        <BasketPage />
      </section>
    </>
  );
}

console.log(products);

export default App;
