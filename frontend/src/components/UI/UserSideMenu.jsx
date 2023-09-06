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
              style={{ height: "100%", alignItems: "start" }}
              bg="dark"
              variant="dark"
              expand="xs"
              collapseOnSelect
            >
              <Nav className="mx-auto" md={12}>
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
                <LinkContainer to={"/support/chat"}>
                  <Nav.Link>
                    <FaMoneyBill />
                    Support & chat
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
