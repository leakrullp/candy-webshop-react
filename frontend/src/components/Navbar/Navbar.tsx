import { Link } from "react-router-dom";
import { numberOfProductsInCart } from "../../utils/cartUtils";
import "./Navbar.css";
import type { User } from "../../types";

interface NavbarProps {
  currentUser: User | null;
  setCurrentUser?: (user: User) => void;
}

//TODO: needs a refactor to reflect real user data

export default function Navbar({ currentUser }: NavbarProps) {
  // const user: string | null = localStorage.getItem("fname");
  // const userId: string = user ? user.slice(0, 2).toUpperCase() : "Login";
  // const logClass: string = user ? "profText" : "";

  const totalInCart = numberOfProductsInCart(currentUser);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/ProductsPage">Products</Link>
      <Link /*className={logClass}*/ to="/login">Login</Link>
      <Link to="/cart">
        Cart
        <span id="cart-count" className="cart-count">
          {totalInCart}
        </span>
      </Link>
    </nav>
  );
}
