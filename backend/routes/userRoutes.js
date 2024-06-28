import express from "express";

// controllers
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  addMembers,
  getAllMembers,
  //   deleteUser,
  //   updateUserRole,
} from "../controllers/userController.js";

// middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// import { authenticate, authRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
router.route("/register").post(createUser);//working
router.post("/login", loginUser);//working
router.post("/auth/logout", logoutUser);
router.get("/", authenticate, authorizeAdmin, getAllUsers);
router.post("/addMembers",addMembers)//working
router.get("/allMembers",getAllMembers)
export default router;
