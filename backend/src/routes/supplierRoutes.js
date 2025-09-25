import express from "express";
import {
  createSupplier,
  getSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier
} from "../controllers/supplierController.js";
import { authenticationToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/", authenticationToken, createSupplier);

router.get("/", authenticationToken, getSuppliers);

router.get("/:id", authenticationToken, getSingleSupplier);

router.put("/:id", authenticationToken, updateSupplier);

router.delete("/:id", authenticationToken, deleteSupplier);

export default router;