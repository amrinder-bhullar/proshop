import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Button, Form, Row } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import {
  useCreateChatMutation,
  useGetAllChatByUserQuery,
} from "../../slices/chatApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../../components/Message";

const UserChatScreen = () => {
  const [description, setDescription] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [createChat, { isLoading: isLoadingSubmit, error }] =
    useCreateChatMutation();
  const {
    data: userChats,
    isLoading: loadingUserChats,
    error: errorUserChats,
  } = useGetAllChatByUserQuery();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await createChat({
        description,
        user: userInfo._id,
      }).unwrap();
      navigate(`/support/chat/${response._id}`);
      console.log(response);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div style={{ position: "relative", height: "500px" }}>
      {loadingUserChats ? (
        <Loader />
      ) : errorUserChats ? (
        <Message variant="danger">
          {errorUserChats?.data?.message || errorUserChats.error}
        </Message>
      ) : userChats.length === 0 ? (
        <Row>
          <h4>
            {userInfo.name}, please start the conversation, let us know what you
            wish to talk about?
          </h4>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="name">
                <Form.Label>Please describe the issue?</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">
                Start conversation
              </Button>

              {isLoadingSubmit && <Loader />}
            </Form>
          </FormContainer>
        </Row>
      ) : (
        <div>
          <h4>
            {userInfo.name}, You already have these chats please click on them
            to continue chatting
          </h4>
          {userChats?.map((chat, index) => (
            <Link key={chat._id} to={`/support/chat/${chat._id}`}>
              {chat.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserChatScreen;
