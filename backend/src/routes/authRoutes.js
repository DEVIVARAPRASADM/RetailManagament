import express from "express";

import {register,login,adminRegister} from "../controllers/authController.js";

const router=express.Router();

router.post("/register",register);
router.post("/admin-register",adminRegister);
router.post("/login",login);

export default router;