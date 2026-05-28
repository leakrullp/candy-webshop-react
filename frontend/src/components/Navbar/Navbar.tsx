import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import type { User } from "../../types";
import { useEffect, useState } from "react";
import { getBasket } from "../../services/basketService";

interface NavbarProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export default function Navbar({ currentUser, setCurrentUser }: NavbarProps) {
  const [totalInCart, setTotalInCart] = useState(0);
  const customerId = currentUser?.customerId ?? "1";
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  useEffect(() => {
    const updateCart = async () => {
      try {
        const basketData = await getBasket(customerId);
        const items = basketData?.basket?.items ?? [];
        const total = items.reduce(
          (sum: number, item: { productId: number; quantity: number }) =>
            sum + (item.quantity || 0),
          0,
        );
        setTotalInCart(total);
      } catch (e) {
        console.error("Failed to load basket for navbar:", e);
      }
    };

    void updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, [customerId]);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/ProductsPage">Products</Link>
      {currentUser ? (
        <>
          <span className="profText">{currentUser.firstname}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <Link to="/cart">
        Cart
        <span id="cart-count" className="cart-count">
          {totalInCart}
        </span>
      </Link>
    </nav>
  );
}
