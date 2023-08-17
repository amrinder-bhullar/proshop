import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSubscribeToNewsletterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();
  const [subscribeToNewsletter, { isLoading, error }] =
    useSubscribeToNewsletterMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    const subscribingUser = {
      email: email,
    };
    try {
      const response = await subscribeToNewsletter(subscribingUser).unwrap();
      toast.success(response.message);
      setEmail("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <footer>
      <Container className="border-top">
        <Row>
          <Col lg={3} md={4} xs={6} className="text-left py-3">
            <p>ABOUT US</p>
            <Col>
              <Link
                className="text-decoration-none d-block"
                to={"/pages/our-story"}
              >
                Our Story
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Store Locations
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Careers
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Our Blog
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Brands
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Contact Us
              </Link>
            </Col>
          </Col>
          <Col lg={3} md={4} xs={6} className="text-left py-3">
            <p>CATEGORIES</p>
            <Col>
              <Link className="text-decoration-none d-block" to={"/#"}>
                Our Story
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Store Locations
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Careers
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Our Blog
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Brands
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Contact Us
              </Link>
            </Col>
          </Col>
          <Col lg={3} md={4} xs={6} className="text-left py-3">
            <p>CUSTOMER CARE</p>
            <Col>
              <Link className="text-decoration-none d-block" to={"/#"}>
                Our Story
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Store Locations
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Careers
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Our Blog
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Brands
              </Link>
              <Link className="text-decoration-none  d-block" to={"/#"}>
                Contact Us
              </Link>
            </Col>
          </Col>
          <Col lg={3} md={4} xs={6} className="text-left py-3">
            <h4>Don't miss out on a sale again</h4>
            {/* <p>Sign up now for sale alerts & special offers</p> */}
            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Row className="px-2">
                <Button
                  type="submit"
                  variant="primary"
                  // disabled={isLoading}
                >
                  SUBSCRIBE
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <p className="text-center py-3">ProShop &copy; {currentYear}</p>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
