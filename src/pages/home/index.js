import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "../../axios-setup";

const Home = (props) => {

    const user = JSON.parse(localStorage.getItem("bugtester_auth")).user;

    const [bugs, setBugs] = useState([]);
    const [users, setUsers] = useState([]);
    const [showBugModel, setShowBugModel] = useState(false);
    const [newBugData, setNewBugData] = useState({
        title: null,
        description: null,
        createdBy: user.username,
        assignedTo: user.username,
        status: null,
        priority: "heigh",
        UserId: user.id,
    })
    
    console.log(newBugData, users)

    const onFetchBugs = async () => {
        let bugs = await axios.get("/bug");
        setBugs(bugs.data.response);
    }

    const onFetchUsers = async () => {
        let users = await axios.get("/users");
        setUsers(users.data.response);
    }

    useEffect(() => {
        (
            async () => {
                onFetchBugs();
                onFetchUsers();
            }

        )()
    }, []);

    const addBug = async () => {
        await axios.put("/bug/add", newBugData)
        .then(async () => {
            onFetchBugs();
            toggle();
        })
       .catch(() => {
            toggle();
       })
    }

    const toggle = () => {
        setShowBugModel(!showBugModel);
    }

    return (
      <div className="home">
        <Container>
          <Row>
            <Col>
              <Button onClick={() => toggle()}>Add +</Button>
            </Col>
          </Row>
          <Row>
            {bugs.map((bug, index) => (
              <Card key={index} className="mt-2">
                <Card.Body>
                  <Row>
                    <Col>
                      <h4>{bug.title}</h4>
                    </Col>
                    <Col md="auto">{bug.assignedTo}</Col>
                    <Row>
                      <Col>{bug.description}</Col>
                    </Row>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>

        <Modal show={showBugModel} onHide={toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Bug</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container>
              <Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setNewBugData({
                        ...newBugData,
                        title: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Description"
                    style={{ height: "100px" }}
                    onChange={(e) =>
                      setNewBugData({
                        ...newBugData,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <DropdownButton title={newBugData.priority}>
                    <Dropdown.Item
                      onClick={(e) =>
                        setNewBugData({
                          ...newBugData,
                          priority: e.target.id,
                        })
                      }
                      id="trivial"
                    >
                      trivial
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="low"
                      onClick={(e) =>
                        setNewBugData({
                          ...newBugData,
                          priority: e.target.id,
                        })
                      }
                    >
                      low
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="medium"
                      onClick={(e) =>
                        setNewBugData({
                          ...newBugData,
                          priority: e.target.id,
                        })
                      }
                    >
                      medium
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="heigh"
                      onClick={(e) =>
                        setNewBugData({
                          ...newBugData,
                          priority: e.target.id,
                        })
                      }
                    >
                      heigh
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="critical"
                      onClick={(e) =>
                        setNewBugData({
                          ...newBugData,
                          priority: e.target.id,
                        })
                      }
                    >
                      critical
                    </Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
              </Form>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={toggle} variant="secondary">
              Close
            </Button>
            <Button onClick={() => addBug()} variant="primary">
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default Home;