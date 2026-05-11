import React from "react";

interface RegisterProps {
  onRegister: (
    fname: string,
    lname: string,
    password: string,
    email: string,
  ) => void;
}
const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const validateEmail = (email: string) => {
    if (!isValidEmail.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    if (!fname || !lname || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      return;
    }

    try {
      onRegister(fname, lname, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Register failed.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First name
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </label>
        <label>
          Last name
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
