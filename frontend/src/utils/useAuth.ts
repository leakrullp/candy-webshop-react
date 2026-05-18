import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";

const useAuth = () => {
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

  return { handleLogin, handleRegister };
};

export default useAuth;