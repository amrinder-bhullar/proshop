import { useEffect, useState } from "react";
import { Nav, ProgressBar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    switch (location.pathname) {
      case "/shipping":
        setProgress(25);
        break;
      case "/payment":
        setProgress(50);
        break;
      case "/placeorder":
        setProgress(75);
        break;

      default:
        break;
    }
  }, [location.pathname]);
  return (
    <>
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {step1 ? (
            <LinkContainer to="/login">
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <LinkContainer to="/shipping">
              <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <LinkContainer to="/payment">
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>payment</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <LinkContainer to="/placeorder">
              <Nav.Link>Place Order</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
      <ProgressBar now={progress} />
    </>
  );
};

export default CheckoutSteps;
