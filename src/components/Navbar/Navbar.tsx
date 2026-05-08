import { Link } from "react-router-dom";
import { numberOfProductsInCart } from "../../utils/cartUtils";
import "./Navbar.css";

//TODO: needs a refactor to reflect real user data

export default function Navbar(){
  const user: string | null = localStorage.getItem("fname");
  const userId: string = user ? user.slice(0, 2).toUpperCase() : "Login";
  const logClass: string = user ? "profText" : "";

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/ProductsPage">Products</Link>
      <Link className={logClass} to="/login">
        {userId}
      </Link>
      <Link to="/cart">
        Cart
        <span id="cart-count" className="cart-count">
          {numberOfProductsInCart()}
        </span>
      </Link>
    </nav>
  );
}