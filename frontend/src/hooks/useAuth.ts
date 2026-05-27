import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import type { User } from "../types";

const useAuth = (setCurrentUser: (user: User | null) => void) => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const customer = await loginUser(email, password);
    if (customer) {
      setCurrentUser(customer);
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

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return { handleLogin, handleRegister, handleLogout };
};

export default useAuth;

