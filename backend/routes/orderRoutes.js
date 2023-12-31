import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getInvoiceById,
} from "../controllers/orderController.js";
import { checkAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems); //add a new order
router.route("/mine").get(protect, getMyOrders); //my orders
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/invoice").get(protect, getInvoiceById); //get invoice by id

//admin routes
router.route("/").get(protect, checkAdmin, getOrders);
router.route("/:id/deliver").put(protect, checkAdmin, updateOrderToDelivered);

export default router;
