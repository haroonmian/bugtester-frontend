import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Form } from "react-bootstrap";
import axios from "../../axios-setup";
import { useHistory } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [message, setMessage] = useState(null);

    const history = useHistory();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(username, password);
        await axios.post("/auth/login", {
          username: username,
          password: password
        })
        .then((res) => {
          localStorage.setItem("bugtester_auth", JSON.stringify(res.data));
          setMessage(res?.data?.message);
          history.push("/");
        })
        .catch((err) => {
          setMessage(err?.message);
        })
    }

    console.log(message);

    return (
      <div className="login">
        <Container>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Text>{message}</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
}

export default Login;