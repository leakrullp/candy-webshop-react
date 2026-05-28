import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import type { User } from "../../types";
import { useEffect, useState, useRef } from "react";
import { getBasket } from "../../services/basketService";

interface NavbarProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export default function Navbar({ currentUser, setCurrentUser }: NavbarProps) {
  const [totalInCart, setTotalInCart] = useState(0);
  const customerIdRef = useRef<string | undefined>(undefined);
  const customerId = currentUser?.customerId;
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.setItem("localUser", JSON.stringify({ items: [] }));
    navigate("/");
  };

  useEffect(() => {
    customerIdRef.current = customerId;

    const updateCart = async () => {
      const id =
        customerIdRef.current ??
        JSON.parse(localStorage.getItem("currentUser") ?? "null")?.customerId;
      try {
        let items;
        if (id) {
          const basketData = await getBasket(id);
          items = basketData?.basket?.items;
        } else {
          const localBasket = localStorage.getItem("localUser");
          const basketAsJSON = localBasket
            ? JSON.parse(localBasket)
            : { items: [] };
          items = basketAsJSON.items;
        }

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
        {totalInCart > 0 && (
          <span id="cart-count" className="cart-count">
            {totalInCart}
          </span>
        )}
      </Link>
    </nav>
  );
}
