import express from "express";
import {createOrder,getOrders,getSpecificOrder,updateOrder,deleteOrder} from "../controllers/orderController.js";
import {authenticationToken} from "../controllers/authController.js";


const router=express.Router();

router.post("/",authenticationToken,createOrder);
router.get("/",authenticationToken,getOrders);

router.get("/:id",authenticationToken,getSpecificOrder);

router.put("/:id",authenticationToken,updateOrder);
router.delete("/:id",authenticationToken,deleteOrder);

export default router;
