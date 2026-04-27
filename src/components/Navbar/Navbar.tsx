import { numberOfProductsInCart } from "../../utils/cartUtils";
import "./Navbar.css";

//TODO: needs a refactor to reflect real user data

export default function Navbar() {
  const user = localStorage.getItem("fname");
  let userId = user ? user.slice(0, 2).toUpperCase() : "Login";
  let logClass = user ? "profText" : "";

  return (
    <nav className="navbar">
      <a href="#placeholder">Home</a>
      <a href="#placeholder">Products</a>
      <a className={logClass} href="#placeholder">
        {userId}
      </a>
      <a href="#placeholder">
        Cart
        <span id="cart-count" className="cart-count">
          {numberOfProductsInCart()}
        </span>
      </a>
    </nav>
  );
}
