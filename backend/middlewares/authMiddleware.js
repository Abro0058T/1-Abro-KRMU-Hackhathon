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

// Function to create permission-based middleware factories
const userPermission = (allowedRoles) => {
  // Validate allowed roles
  if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
    throw new Error(
      "Invalid allowedRoles: Roles Array is empty, no roles defined"
    );
  }

  // Efficiently check for role membership
  const roleSet = new Set(allowedRoles); // Use a Set for faster checks

  return (req, res, next) => {
    // Extract user object from request (adapt to your authentication setup)
    const user = req.user;

    // Check if user is authenticated (replace with your authentication logic)
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Efficiently check if user's role is in the allowed set
    if (!roleSet.has(user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }

    // Access granted, proceed to next middleware or route handler
    next();
  };
};

const checkRole = (role) => (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY); // Replace with your secret key

    if (decoded.role !== role) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    next(); // Proceed if authenticated and authorized
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { authenticate, authorizeAdmin, userPermission, checkRole };
