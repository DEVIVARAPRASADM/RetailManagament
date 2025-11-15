import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  created_at: { type: Date, default: Date.now }
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
