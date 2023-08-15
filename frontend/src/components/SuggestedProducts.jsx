import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import Product from "./Product";
import { useParams } from "react-router-dom";

const SuggestedProducts = () => {
  const { id } = useParams();
  const {
    data: products,
    isLoading,
    error,
    isError,
  } = useGetTopProductsQuery(id);
  if (!isLoading && !isError) {
    const sameProduct = products.forEach((product) => {
      if (product._id === id) {
        console.log(true);
      }
    });
    //   .filter((product) => product._id !== id);
    console.log(sameProduct);
  }
  return (
    <Container className="mt-4">
      <Row>
        <h3>Products you may like</h3>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default SuggestedProducts;
