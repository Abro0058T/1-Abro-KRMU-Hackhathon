import express from "express";

// controllers
// upload file-> video controller
import {
  getAllImagesReels,
  getSpecificImageReel,
  deleteImageReel,
} from "../controllers/imageController.js";

// middlewares
import {
  authenticate,
  authorizeAdmin,
  checkRole,
} from "../middlewares/authMiddleware.js";

// import { authenticate, authRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes

router.get("/", authenticate, getAllImagesReels);
router.get("/:id", getSpecificImageReel);
router.delete("/delete/:id", authenticate, authorizeAdmin, deleteImageReel);

export default router;
