import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Row, Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedUser = {
      _id: userId,
      name,
      email,
      isAdmin,
    };

    const result = await updateUser(updatedUser);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("User updated");
      navigate("/admin/userlist");
    }
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User details</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="type your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.value)}
              ></Form.Check>
            </Form.Group>
            {isLoading && <Loader />}
            <Button type="submit" variant="primary" className="mt-3">
              Update user
            </Button>
            <Row className="py-3"></Row>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
