import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticationToken } from "../controllers/authController.js";

const router = express.Router();

// Configure Multer (to store in "uploads" folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // create folder if not exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", authenticationToken, upload.single("image"), createProduct);
router.get("/", authenticationToken, getProducts);
router.get("/:id", authenticationToken, getSingleProduct);
router.put("/:id", authenticationToken, upload.single("image"), updateProduct);
router.delete("/:id", authenticationToken, deleteProduct);

export default router;
