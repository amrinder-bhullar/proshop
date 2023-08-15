import { useNavigate, useParams } from "react-router-dom";
import {
  Col,
  Row,
  ListGroup,
  Button,
  ListGroupItem,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import Loader from "../Loader";
import Message from "../Message";
import { useCreateReviewMutation } from "../../slices/productsApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductReviews = ({ product, userInfo, productId, refetch }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [createReview, { isLoading: loadingCreateReview }] =
    useCreateReviewMutation();

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
  );
};

export default ProductReviews;
