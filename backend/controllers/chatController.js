import asyncHandler from "../middleware/asyncHandler.js";
import Chat from "../models/chatModel.js";

// @desc create new Chat
// @route POST /api/chat
// @access Private

const createNewChat = asyncHandler(async (req, res) => {
  const { description, user } = req.body;

  const chat = new Chat({
    user: user,
    title: description,
  });
  chat.messages.push({ sender: user, text: description });

  const createdChat = await chat.save();

  res.status(201).json(createdChat);
});

// @desc get chat by id
// @route GET /api/chat/:id
// @access private

const getChatById = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  if (chat) {
    res.status(200).json(chat);
  } else {
    res.status(404);
    throw new Error("chat not found");
  }
});

// @desc get chat by id
// @route GET /api/chat/:id
// @access private

const addMessagesToChat = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const chat = await Chat.findById(req.params.id);
  if (chat) {
    chat.messages.push(message);
    res.status(201);
  } else {
    res.status(404);
    throw new Error("chat not found");
  }
});

// @desc get all chats
// @route GET /api/chat
// @access Private/Admin

const getAllChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({});
  res.status(200).json(chats);
});

// @desc get all chats
// @route GET /api/chat/userchats
// @access Private/Admin

const getAllChatsByUser = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ user: req.user._id });
  res.status(200).json(chats);
});

export {
  createNewChat,
  getChatById,
  getAllChats,
  getAllChatsByUser,
  addMessagesToChat,
};
