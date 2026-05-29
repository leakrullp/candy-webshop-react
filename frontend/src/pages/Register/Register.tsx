import { useState } from "react";
import type { SubmitEvent } from "react";
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

function Register({ onRegister }: RegisterProps) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    if (!isValidEmail.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      setError(err instanceof Error ? err.message : "Registration failed.");
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
}

export default Register;
