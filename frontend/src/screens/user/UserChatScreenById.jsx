import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../../../utils/socket";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { useGetChatByIdQuery } from "../../slices/chatApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const UserChatScreenById = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: chatData,
    isLoading: loadingChatData,
    error: errorChatData,
  } = useGetChatByIdQuery(id);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!loadingChatData && !errorChatData) {
      if (chatData.user === userInfo._id || userInfo.isAdmin) {
        setMessages(chatData.messages);
        socket.connect();
        socket.emit("chat", id);
        socket.on("message", (newMsg) =>
          setMessages((state) => [...state, newMsg])
        );
        // socket.on("chatInfo", (session) => console.log(session));
        socket.on("warning", (text) => toast.warning(text));
      } else {
        navigate("/support/chat");
        toast.error("you are not authorized");
      }
    }
  }, [chatData]);

  const handleClick = () => {
    const message = {
      text: text,
      sender: userInfo._id,
    };

    socket.emit("chatMessage", message);
    setText("");
  };

  return (
    <div style={{ position: "relative", height: "500px" }}>
      {loadingChatData ? (
        <Loader />
      ) : errorChatData ? (
        <Message variant="danger">
          {errorChatData?.data?.message || errorChatData.error}
        </Message>
      ) : (
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages?.map((item, index) => (
                <Message
                  key={index}
                  model={{
                    message: item.text,
                    sentTime: "just now",
                    sender: item.sender,
                    direction:
                      item.sender === userInfo._id ? "outgoing" : "incoming",
                  }}
                >
                  <Avatar
                    src={
                      item.sender === userInfo._id
                        ? "https://chatscope.io/storybook/react/static/media/joe.641da105.svg"
                        : "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                    }
                    name="Joe"
                  />
                  <Message.Footer sender={item.sender} sentTime="just now" />
                </Message>
              ))}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              onSend={handleClick}
              onChange={(innerText) => setText(innerText)}
              value={text}
            />
          </ChatContainer>
        </MainContainer>
      )}
    </div>
  );
};

export default UserChatScreenById;
