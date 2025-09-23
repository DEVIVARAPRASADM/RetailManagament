import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",          
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",            
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total_amount: {
    type: Number,
  },
  sale_date: {
    type: Date,
    default: Date.now,
  }
});

const Sales = mongoose.model("Sales", salesSchema);
export default Sales;