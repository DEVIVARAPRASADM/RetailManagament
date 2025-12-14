import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

/* FIXED CORS */
app.use(cors());

/* middleware */
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* DB */
connectDB();

/* routes */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

/* server */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
