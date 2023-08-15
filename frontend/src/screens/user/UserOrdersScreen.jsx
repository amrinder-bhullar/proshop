import { useState, useEffect } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";
import FormContainer from "../../components/FormContainer";

const UserOrdersScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: myOrders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetMyOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Row>
      <Col>
        <h2>{userInfo.name} order's</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">
            {errorOrders?.data?.message || errorOrders.error}
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOrders.length !== 0 &&
                myOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default UserOrdersScreen;
