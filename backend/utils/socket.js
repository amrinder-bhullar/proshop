import cors from "cors";
import { Server } from "socket.io";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

const runSocketIO = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    const session = {};

    socket.on("isAdmin", async (userID) => {
      const user = await User.findById(userID);
      if (user.isAdmin) {
        const allChats = await Chat.find({}).populate("user");
        socket.emit("chats", allChats);
      }
    });

    socket.on("chat", async (chatId) => {
      session.currentChat = await Chat.findById(chatId).populate("user");
      socket.join(session.currentChat._id);
      socket.emit("loadChat", session.currentChat);
    });

    socket.on("chatMessage", async ({ text, sender }) => {
      if (session.currentChat) {
        session.currentChat.messages.push({ text, sender });
        await session.currentChat.save();
      } else {
        socket.emit("warning", "refresh");
      }

      // io.emit("chatInfo", session);

      io.to(session.currentChat._id).emit("message", {
        text: text,
        sender: sender,
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      });
    });

    socket.on("disconnect", () => {
      socket.disconnect();
      console.log("🔥: A user disconnected");
    });
  });
};

export default runSocketIO;
