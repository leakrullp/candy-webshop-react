import "./index.css";
import ProductsPage from "./pages/ProductsPage";
import BasketPage from "./pages/BasketPage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "./services/authService";

function AppContent() {
  const navigate = useNavigate();

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
    password: string
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
        <Route path="/" element={<ProductsPage />} />
        <Route path="/ProductsPage" element={<ProductsPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/cart" element={<BasketPage />} />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
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
