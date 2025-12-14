// routes/orderRoutes.js
import express from "express";
import { 
    createOrder, getOrders, getSpecificOrder, updateOrder, deleteOrder, receiveOrder 
} from "../controllers/orderController.js";
import { authenticationToken } from "../controllers/authController.js"; // Use your middleware

const router = express.Router();

router.post("/", authenticationToken, createOrder);
router.get("/", authenticationToken, getOrders);
router.get("/:id", authenticationToken, getSpecificOrder);
router.put("/:id", authenticationToken, updateOrder);
router.delete("/:id", authenticationToken, deleteOrder);

router.put("/:id/receive", authenticationToken, receiveOrder); 

export default router;