import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";

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
    <Container>
      <Row lg={2}>
        <Form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <h2>Register an account</h2>

          <Form.Group className="mb-3" controlId="formFname">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLname">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Button type="submit" variant="primary">
              Register
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};

export default Register;
