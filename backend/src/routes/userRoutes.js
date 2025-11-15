import express from "express";
import {
  getShopOwners,
  getSuppliers,
  verifyUser,
  getAllUsers,
} from "../controllers/userController.js";
import { protect,admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes in this file are protected and require admin access.
// The protect middleware runs first, then the admin middleware.
router.use(protect, admin);

// Route to get all users
router.get("/", getAllUsers);

// Route to get all shop owners
router.get("/shopowners", getShopOwners);

// Route to get all suppliers
router.get("/suppliers", getSuppliers);

// Route to verify a specific user
router.patch("/verify/:id", verifyUser);

export default router;