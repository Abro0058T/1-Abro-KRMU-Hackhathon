import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// Check if the user is authenticated or not
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no Token");
  }
});

// Check if the user is admin or not
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    res.status(401).send("Not authorized as an Admin");
  }
};

export { authenticate, authorizeAdmin };
