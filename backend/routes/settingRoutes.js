import express from "express";
import { protect, checkAdmin } from "../middleware/authMiddleware.js";
import { createProduct } from "../controllers/productController.js";
import {
  addSlide,
  deleteSlide,
  getSlides,
  updateSlide,
} from "../controllers/settingController.js";
const router = express.Router();

//route: /api/settings

router.route("/slider").get(getSlides).post(protect, checkAdmin, addSlide);
router
  .route("/slider/:id")
  .delete(protect, checkAdmin, deleteSlide)
  .put(protect, checkAdmin, updateSlide);

export default router;
