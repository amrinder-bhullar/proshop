import express from "express";
import {
  addPage,
  getPageById,
  getPageByUrl,
  getPages,
  updatePage,
} from "../controllers/pageController.js";
import { checkAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getPages).post(addPage);
router.route("/:id").get(getPageById).put(updatePage);
router.route("/url/:url").get(getPageByUrl);

export default router;
