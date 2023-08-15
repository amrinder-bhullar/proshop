import express from "express";
import {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, checkAdmin } from "../middleware/authMiddleware.js";
import { createProduct } from "../controllers/productController.js";
const router = express.Router();

// route: /api/products

router.route("/").get(getProducts).post(protect, checkAdmin, createProduct);
router.route("/top/:id").get(getTopProducts);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, checkAdmin, updateProduct)
  .delete(protect, checkAdmin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
