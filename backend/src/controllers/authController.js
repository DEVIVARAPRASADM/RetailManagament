// controllers/authController.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
const register = async (req, res, next) => {
  try {
    const { 
      username, 
      email, 
      password, 
      role, 
      business_name, 
      business_license,
      phone, 
      address 
    } = req.body;
    
    // 1. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user 
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role, // Use the role provided, which is now valid in the schema
      business_name,
      business_license,
      phone,
      address,
      is_verified: false,
      created_at: new Date()
    });

    // 4. Save user
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    // This now catches errors other than the validation one we just fixed (e.g., unique index violation)
    console.log(error);
    // You should ensure error responses provide a useful message
    const errorMessage = error.code === 11000 && error.keyPattern.business_license ? "Business license number already in use." : error.message;
    res.status(500).json({ message: "Error registering user", error: errorMessage });
  }
};
export const adminRegister = async (req, res, next) => {
  try {
    const { 
      username, 
      email, 
      password, 
      role, 
    } = req.body;
    
    // 1. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user 
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role, // Use the role provided, which is now valid in the schema
      created_at: new Date()
    });

    // 4. Save user
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    // This now catches errors other than the validation one we just fixed (e.g., unique index violation)
    console.log(error);
    // You should ensure error responses provide a useful message
    const errorMessage = error.code === 11000 && error.keyPattern.business_license ? "Business license number already in use." : error.message;
    res.status(500).json({ message: "Error registering user", error: errorMessage });
  }
};
// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.is_verified) {
      return res.status(403).json({ message: "Account not verified yet" });
    }

    // --- 1. GENERATE THE JWT TOKEN ---
    // Payload contains all necessary info for AuthContext (business_name is key)
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role, 
        business_name: user.business_name, 
        username: user.username 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1000h" }
    );

    // --- 2. UPDATE THE JSON RESPONSE ---
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        business_name: user.business_name,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// AUTH MIDDLEWARE
const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // IMPORTANT: req.user is populated here with {id, role, business_name, username}
    req.user = payload; 
    next();
  });
};

export {register,login,authenticationToken};