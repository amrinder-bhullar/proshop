import React from "react";
import { Col, Container, Row, Nav, Navbar } from "react-bootstrap";
import { FaMoneyBill, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";

const AdminSideMenu = () => {
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
                <LinkContainer to={"/admin/orderlist"}>
                  <Nav.Link>Orders</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/productlist"}>
                  <Nav.Link>Products</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/userlist"}>
                  <Nav.Link>Users</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/pages"}>
                  <Nav.Link>Pages</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/support/chat"}>
                  <Nav.Link>Support & Chat</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/settings/slider"}>
                  <Nav.Link>Settings</Nav.Link>
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

export default AdminSideMenu;
