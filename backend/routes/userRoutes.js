import express from "express";

// controllers
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  //   deleteUser,
  //   updateUserRole,
} from "../controllers/userController.js";

// middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// import { authenticate, authRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
router.route("/register").post(createUser);
router.post("/login", loginUser);
router.post("/auth/logout", logoutUser);
router.get("/", authenticate, authorizeAdmin, getAllUsers);

export default router;
