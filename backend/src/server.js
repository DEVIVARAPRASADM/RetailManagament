import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";


dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

