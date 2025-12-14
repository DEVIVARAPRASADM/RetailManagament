// routes/productRoutes.js (Fixed and Integrated)
import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getDiscoveryProducts 
} from "../controllers/productController.js";
import { authenticationToken } from "../controllers/authController.js";

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, "uploads/"); },
  filename: (req, file, cb) => { cb(null, Date.now() + "-" + file.originalname); },
});
const upload = multer({ storage });

// Routes
router.post("/", authenticationToken, upload.single("image"), createProduct);
router.get("/", authenticationToken, getProducts); 
router.get('/discover', authenticationToken,getDiscoveryProducts);
router.get("/:id", authenticationToken, getSingleProduct);
router.put("/:id", authenticationToken, upload.single("image"), updateProduct);
router.delete("/:id", authenticationToken, deleteProduct);

export default router;