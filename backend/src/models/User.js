import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
     type: String,
     required: true, 
     unique: true 
    },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true
 },
  password: { 
    type: String, 
    required: true 
},
  role: { 
    type: String, 
    enum: ["shop_owner", "supplier"], 
    required: true 
},
  business_name: { 
    type: String,
     required: true 
    },
  business_license: { 
    type: String, 
    required: true,
     unique: true 
    }, 
  phone: { 
    type: String, 
    required: true
 },
  address: { type: String },
  is_verified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

const User=mongoose.model("User",userSchema);
export default User;