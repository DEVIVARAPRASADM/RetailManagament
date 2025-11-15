// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: {                           
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [                            
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {  
        type: Number,
        required: true
      }
    }
  ],

  total_price: {
    type: Number,
    default: 0
  },

  status: {                           
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled"],
    default: "processing"
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now } 
});

orderSchema.pre("save", function(next) {
  this.updated_at = Date.now();
  this.total_price = this.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;