import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../../../utils/socket";
import Loader from "../../../components/Loader";
import { useParams } from "react-router-dom";

const zoeIco =
  "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

const AdminChatById = () => {
  const [text, setText] = useState("");
  const [loadingChat, setLoadingChat] = useState(true);
  const [currentChat, setCurrentChat] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    socket.emit("chat", id);
    socket.on("loadChat", (data) => {
      setCurrentChat(data);
      setMessages(data.messages);
      setLoadingChat(false);
      // console.log(data);
    });
    //   socket.on("chatInfo", (session) => console.log(session));
    socket.on("message", (newMsg) =>
      setMessages((state) => [...state, newMsg])
    );
  }, [id]);

  const handleClick = () => {
    const message = {
      text: text,
      sender: userInfo._id,
    };

    socket.emit("chatMessage", message);
    setText("");
  };
  return (
    <>
      {loadingChat ? (
        <Loader />
      ) : (
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={zoeIco} name={currentChat?.user?.name} />
            <ConversationHeader.Content
              userName={currentChat?.user?.name}
              info="Active 10 mins ago"
            />
          </ConversationHeader>
          <MessageList>
            {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
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
      )}
    </>
  );
};

export default AdminChatById;
