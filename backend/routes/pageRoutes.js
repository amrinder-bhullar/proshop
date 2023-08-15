import express from "express";
import {
  addPage,
  getPageById,
  getPages,
  updatePage,
} from "../controllers/pageController.js";
import { checkAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getPages).post(addPage);
router.route("/:id").get(getPageById).put(updatePage);

export default router;
