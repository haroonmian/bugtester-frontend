import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("bugtester_auth")).user;

  const onSignOut = () => {
    localStorage.removeItem("bugtester_auth");
    history.push("/login");
  };

  return (
    <Container className="header">
      <Row>
        <Col md="6">
          <div className="userinfo mt-3">
            <h6>{user.username}</h6>
            <p>{user.role}</p>
          </div>
        </Col>
        <Col md="6" className="mt-3 text-end">
          <Button onClick={() => onSignOut()}>Sign Out</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
