import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const register = async (req, res) => {
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

    // 3. Create user (with required schema fields)
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
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
    res.status(500).json({ message: "Error registering user", error });
  }
};

const login = async (req,next,res) => {
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

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // optional expiry
    );

    // Response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,  // fixed key name
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const authenticationToken =async(request,response)=>{
    let jwtToken;
    const authHeader=request.headers["authorization"];
    if(authHeader!=undefined){
      jwtToken=authHeader.split(" ")[1];
    }
    if(jwtToken==undefined){
      response.status(200).send("Invalid jwtToken");
    }
    else{
      jwt.verify(jwtToken,process.env.JWT_SECRET,async(error,payload)=>{
        if(error){
          response.status(401).send("Invalid jwtToken");
        }
        else{
          // request.user_name=payload.username;
          next();
        }
      })
    }
};

export {register,login,authenticationToken};