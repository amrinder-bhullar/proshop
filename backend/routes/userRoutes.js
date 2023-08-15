import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  subscribeToNewsletter,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { checkAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth", authUser); //login
router.post("/", registerUser); //register
router.post("/logout", logoutUser); //logout
// manage user profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//admin routes
router.route("/").get(protect, checkAdmin, getUsers);
router
  .route("/:id")
  .get(protect, checkAdmin, getUserById)
  .put(protect, checkAdmin, updateUser)
  .delete(protect, checkAdmin, deleteUser);
router.route("/newsletter").post(subscribeToNewsletter);

export default router;
