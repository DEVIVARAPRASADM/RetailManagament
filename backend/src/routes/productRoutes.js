import express from "express";
import { createProduct, getProducts,getSingleProduct,updateProduct,deleteProduct} from "../controllers/productController.js";
import {authenticationToken} from "../controllers/authController.js";

const router = express.Router();

router.post("/", authenticationToken, createProduct);    
router.get("/", authenticationToken, getProducts);     
router.get("/:id", authenticationToken, getSingleProduct);   
router.put("/:id", authenticationToken, updateProduct);    
router.delete("/:id", authenticationToken, deleteProduct);


export default router;