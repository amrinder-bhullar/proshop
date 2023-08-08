import { useNavigate, useParams } from "react-router-dom";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

const productScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading: loading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingCreateReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const review = {
      productId,
      rating,
      comment,
    };
    try {
      await createReview(review).unwrap();
      toast.success("review submited");
      refetch();
      setComment("");
      setRating(0);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Button className="btn btn-light my-3" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroupItem>
                <ListGroupItem>Price: ${product.price}</ListGroupItem>
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock ? "in stock" : "out of stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      {product.countInStock ? "Add To Cart" : "Notify me"}
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Write a Customer review</h2>
                  {loadingCreateReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId="rating" className="my-2">
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value={""}>Select...</option>
                          <option value={"1"}>1 - Poor</option>
                          <option value={"2"}>2 - Fair</option>
                          <option value={"3"}>3 - Good</option>
                          <option value={"4"}>4 - Very Good</option>
                          <option value={"5"}>5 - Excellent</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="comment" className="my-2">
                        <FormLabel>Comment</FormLabel>
                        <FormControl
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></FormControl>
                        <Button
                          type="submit"
                          disabled={loadingCreateReview}
                          variant="primary"
                        >
                          Submit review
                        </Button>
                      </FormGroup>
                    </Form>
                  ) : (
                    <Message>
                      Please{" "}
                      {
                        <Link to={`/login?redirect=/product/${productId}`}>
                          login
                        </Link>
                      }{" "}
                      to review the product
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default productScreen;
