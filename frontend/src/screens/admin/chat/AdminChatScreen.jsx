import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  ConversationHeader,
  MessageSeparator,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../../../utils/socket";
import Loader from "../../../components/Loader";
const lillyIco =
  "https://chatscope.io/storybook/react/static/media/lilly.62d4acff.svg";
const joeIco =
  "https://chatscope.io/storybook/react/static/media/joe.641da105.svg";
const emilyIco =
  "https://chatscope.io/storybook/react/static/media/emily.d34aecd9.svg";
const zoeIco =
  "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";
const AdminChatScreen = () => {
  const [text, setText] = useState("");
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingChat, setLoadingChat] = useState(true);
  const [allChats, setAllChats] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.emit("isAdmin", userInfo._id);
    socket.on("chats", (data) => {
      setAllChats(data);
      setCurrentChat(data[0]);
      socket.emit("chat", data[0]._id);
      setMessages(data.messages);
      setLoadingChats(false);
      setLoadingChat(false);
    });
    socket.on("loadChat", (data) => {
      setCurrentChat(data);
      setMessages(data.messages);
      setLoadingChat(false);
      console.log(data);
    });
    socket.on("message", (newMsg) =>
      setMessages((state) => [...state, newMsg])
    );
    return () => {
      socket.disconnect();
    };
  }, []);

  const loadChatHandler = (id) => {
    setLoadingChat(true);
    socket.emit("chat", id);
  };

  const handleClick = () => {
    const message = {
      text: text,
      sender: userInfo._id,
    };

    socket.emit("chatMessage", message);
    setText("");
  };
  return (
    <div
      style={{
        height: "600px",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          {loadingChats ? (
            <Loader />
          ) : (
            <ConversationList>
              {allChats.map((chat) => (
                <Conversation
                  key={chat._id}
                  name={chat.user.name}
                  lastSenderName="Lilly"
                  info={chat.title}
                  onClick={() => loadChatHandler(chat._id)}
                  active={chat._id === currentChat._id}
                >
                  {/* <Avatar src={lillyIco} name="Lilly" status="available" /> */}
                </Conversation>
              ))}
            </ConversationList>
          )}
        </Sidebar>
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
      </MainContainer>
    </div>
  );
};

export default AdminChatScreen;
