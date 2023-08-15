import React from "react";
import { Col, Container, Row, Nav, Navbar } from "react-bootstrap";
import { FaMoneyBill, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";

const UserSideMenu = () => {
  return (
    <>
      <Container xs={12} md={2}>
        <Row>
          <Col>
            <Navbar
              //   bg="light"
              variant="light"
              expand="xs"
              collapseOnSelect
            >
              <Nav
                className="ms-auto d-flex .flex-column justify-content-center align-items-center"
                md={12}
              >
                <LinkContainer to={"/profile"}>
                  <Nav.Link>
                    <FaUser />
                    Profile
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/myorders"}>
                  <Nav.Link>
                    <FaMoneyBill />
                    Orders
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar>
          </Col>
          <Col xs={12} md={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserSideMenu;
