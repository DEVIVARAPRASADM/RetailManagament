import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();
const app = express();



app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/orders", orderRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
