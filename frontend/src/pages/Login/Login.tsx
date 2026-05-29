import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Form, Button } from "react-bootstrap";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      onLogin(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    }
  };

  return (
    <Container>
      <Row lg={2}>
        <Form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <h2>Login</h2>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form.Group>
          <p>
            Not signed up? <Link to="/register">Register here.</Link>
          </p>
        </Form>
      </Row>
    </Container>
  );
}

export default Login;
