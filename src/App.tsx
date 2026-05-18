import "./index.css";
import { Navbar } from "./components";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "./services/authService";
import { FrontPage, BasketPage, ProductsPage, Login, Register } from "./pages";
import CountryPage from "./pages/CountryPage";

function AppContent() {
  const navigate = useNavigate();

  // POTENTIAL STATES TO KEEP GLOBALLY

  // basket items so we can read the number and use in navbar
  // const [items, setItems] = useState<BasketProduct[]>([]);

  // fetch products once and keep around, instead of loading from server constantly
  // then we just pass the products down as a prop to FrontPage, BasketPage, ProductsPage etc.
  // const [products, setProducts] = useState<Product[]>([]);

  const handleLogin = async (email: string, password: string) => {
    const customer = await loginUser(email, password);
    if (customer) {
      navigate("/");
    } else {
      navigate("/register");
    }
  };

  const handleRegister = async (
    fname: string,
    lname: string,
    email: string,
    password: string,
  ) => {
    const customer = await registerUser(fname, lname, email, password);
    if (customer) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/ProductsPage" element={<ProductsPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/cart" element={<BasketPage />} />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        <Route path="/country/:country" element={<CountryPage/>} />
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
