import cors from "cors";
import { Server } from "socket.io";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

const runSocketIO = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    const session = {};
    let currentChat;
    let currentChatId;

    socket.on("isAdmin", async (userID) => {
      const user = await User.findById(userID);
      if (user.isAdmin) {
        const allChats = await Chat.find({})
          .sort({ updatedAt: "desc" })
          .populate("user")
          .populate({
            path: "messages",
            populate: {
              path: "sender",
              model: "User",
              select: "name",
            },
          });
        socket.emit("chats", allChats);
      }
    });

    socket.on("chat", async (chatId) => {
      currentChat = await Chat.findById(chatId).populate("user");
      currentChatId = currentChat._id.toString();
      socket.join(currentChatId);
      socket.emit("loadChat", currentChat);
    });
    socket.on("leaveChat", (id) => {
      // console.log("before", socket.rooms);
      socket.leave(id);
      // console.log("leave chat");
      // console.log("after", socket.rooms);
    });

    socket.on("chatMessage", async ({ text, sender }) => {
      if (currentChat) {
        currentChat.messages.push({ text, sender });
        await currentChat.save();
      } else {
        socket.emit("warning", "refresh");
      }

      // io.emit("chatInfo", socket.rooms);

      io.to(currentChatId).emit("message", {
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
