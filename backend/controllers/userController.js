import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import TeamMember from "../models/teamMember.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input data (optional but recommended)
  console.log(email, username, password);
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Hash password securely before saving
  // const hashedPassword = await bcrypt.hash(password, 10); // Increase salt rounds for better security

  // Create a new user with the provided or default role
  const newUser = new User({
    username,
    email,
    password: password,
    role: req.body.role || "videoEditor", // Use default role if not provided
  });

  try {
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (err) {
    console.error(err); // Log errors for debugging
    res.status(500).json({ message: "Internal server error" }); // Handle errors gracefully
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
console.log(req.body)
  const existingUser = await User.find({email});
  console.log(existingUser)
  if(!existingUser.length){
    
    throw new Error("User not found")
  }
  // console.log(existingUser);
  if(!(await existingUser[0].isPasswordMatch(password))){
    throw new Error("Incorrect password")
    } else {
      // incorrect password
      res.status(200).json({ message: "login user" ,userData:existingUser[0]});
    }

});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const addMembers=asyncHandler(async(req,res)=>{
  const {email,role,password,username,adminId}=req.body
  const existingUser = await TeamMember.create({email,role,password,username,adminId})
  console.log(existingUser);
  if(existingUser){
    res.status(201).json({message:"Member added successfully",user:existingUser})
  }
  else{
    res.status(401).json({message:"Member not added"})
  }
})

const getAllMembers =asyncHandler(async(req,res)=>{
  try{const {adminId}=req.query
  console.log(req.query.adminId,"params")
  const members=await TeamMember.find({adminId})
  console.log(members)
  res.status(200).json({data:members})
  }catch(error){
    console.log(error);
  throw new Error("Error fetching member of team")
  }
})
export { createUser, loginUser, logoutUser, getAllUsers ,addMembers,getAllMembers};
