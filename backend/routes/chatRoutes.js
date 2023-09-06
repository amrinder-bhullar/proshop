import express from "express";
import {
  createNewChat,
  getChatById,
  getAllChats,
  getAllChatsByUser,
  addMessagesToChat,
} from "../controllers/chatController.js";
import { checkAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createNewChat).get(protect, checkAdmin, getAllChats); // create new chat
router.route("/userchats").get(protect, getAllChatsByUser); // get all chats of the logged in user
router.route("/:id").get(getChatById).post(addMessagesToChat);

export default router;
