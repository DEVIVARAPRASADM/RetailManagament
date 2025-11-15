import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, 

  name: { 
    type: String, 
    required: true, 
  }, 
  email: { 
    type: String, 
    trim: true, 
    lowercase: true 
  }, 

  address: { 
    type: String, 
    trim: true 
  }, 

  products_supplied: [{ 
    type: String 
  }], 
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;