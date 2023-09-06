import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutApiCallMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutApiCallMutation();

  const itemsInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("logged out successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err.error);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>
              <img src={logo} alt="ProShop" />
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/myorders"}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={"/login"}>
                  <Nav.Link>
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                // <NavDropdown title="Admin" id="adminmenu">
                //   <LinkContainer to={"/admin/orderlist"}>
                //     <NavDropdown.Item>Orders</NavDropdown.Item>
                //   </LinkContainer>
                //   <LinkContainer to={"/admin/productlist"}>
                //     <NavDropdown.Item>Products</NavDropdown.Item>
                //   </LinkContainer>
                //   <LinkContainer to={"/admin/userlist"}>
                //     <NavDropdown.Item>Users</NavDropdown.Item>
                //   </LinkContainer>
                //   <LinkContainer to={"/admin/settings/slider"}>
                //     <NavDropdown.Item>Settings</NavDropdown.Item>
                //   </LinkContainer>
                //   <LinkContainer to={"/admin/pages"}>
                //     <NavDropdown.Item>Pages</NavDropdown.Item>
                //   </LinkContainer>
                // </NavDropdown>
                <LinkContainer to={"/admin/orderlist"}>
                  <Nav.Link>
                    <FaUser /> Admin
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <FaShoppingCart />
                  {itemsInCart > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {" "}
                      {itemsInCart}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
