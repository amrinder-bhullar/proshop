import { useEffect, useState } from "react";
import Product from "../components/Product";
// import products from "../products";
import { Row, Col, Button, Carousel } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const {
    data,
    isLoading: loading,
    isError: error,
  } = useGetProductsQuery({ keyword, pageNumber });
  return (
    <>
      <Meta />
      <h1>Latest Products</h1>
      {keyword ? (
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          data.products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
      {!loading && !error && (
        <Paginate
          pages={data.pages}
          page={data.page}
          keyword={keyword ? keyword : ""}
        />
      )}
    </>
  );
};

export default HomeScreen;
