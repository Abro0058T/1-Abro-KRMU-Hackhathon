import express from "express";
import multer from "multer";
import { roles } from "../config/roles.js";

// controllers
import {
  uploadVideo,
  deleteVideo,
  downloadVideo,
  // getPreSignedUrl,
  // getFileNamesController,
  editVideo,
  getAttributes,
  //   deleteUser,
  fetchAllVideos,
  fetchAllImages,
  fetchAllReel,
  getSingleVideo,
  getSingleImage,
  getSingleReel,
  //   updateUserRole,
} from "../controllers/videoController.js";

// middlewares
import {
  authenticate,
  authorizeAdmin,
  userPermission,
  checkRole,
} from "../middlewares/authMiddleware.js";

// import { authenticate, authRoles } from "../middlewares/authMiddleware.js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// routes
//   router.post("/",authenticate, authorizeAdmin, uploadVideo);
router.post("/", upload.single("image"), uploadVideo);
// router.delete("/:id", authenticate, authorizeAdmin, deleteVideo);
router.delete("/delete/:videoKey", deleteVideo);
// router.put("/:id", authenticate, editVideo);
router.get("/download/:id", downloadVideo);
router.get("/allVideos",fetchAllVideos)
router.get("/allImages",fetchAllImages)
router.get("/allReels",fetchAllReel)
router.get("/singleVideo/:id",getSingleVideo)

router.get("/singleImage/:id",getSingleImage)

router.get("/singleReel/:id",getSingleReel)

// router.get("/url/:id", getPreSignedUrl);
// router.get("/list/", getFileNamesController);
// router.get(
//   "/download/:id",
//   userPermission([roles.admin, roles.videoEditor]),
//   downloadVideo
// );

// for editor, to edit the video
router.put("/edit/:id", editVideo);
router.get("/attributes/:id", getAttributes);

export default router;
