import "./index.css";
import { Navbar } from "./components";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { FrontPage, BasketPage, ProductsPage, Login, Register } from "./pages";
import CountryPage from "./pages/CountryPage";
import useProducts from "./utils/useProducts";
import useAuth from "./utils/useAuth";

function AppContent() {
  const { products, loading, error } = useProducts();
  const { handleLogin, handleRegister } = useAuth();

  // POTENTIAL STATES TO KEEP GLOBALLY

  // basket items so we can read the number and use in navbar
  // const [items, setItems] = useState<BasketProduct[]>([]);

  // fetch products once and keep around, instead of loading from server constantly
  // then we just pass the products down as a prop to FrontPage, BasketPage, ProductsPage etc.
  // const [products, setProducts] = useState<Product[]>([]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <FrontPage products={products} loading={loading} error={error} />
          }
        />
        <Route path="/ProductsPage" element={<ProductsPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/cart" element={<BasketPage />} />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="/country/:country"
          element={
            <CountryPage products={products} loading={loading} error={error} />
          }
        />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
