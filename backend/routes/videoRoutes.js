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
  uploadImage,
  uploadReel,
  updateMedia,
  createNewProject,
  uploadVideoAssests,
  uploadAudioAssests,
  deleteImageAssest,
  //   updateUserRole,
} from "../controllers/videoController.js";

// middlewares
import {
  authenticate,
  authorizeAdmin,
  userPermission,
  checkRole,
} from "../middlewares/authMiddleware.js";

import { upload } from "../middlewares/multer.js";
// import { authenticate, authRoles } from "../middlewares/authMiddleware.js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload1 = multer({ storage: storage });
// routes
//   router.post("/",authenticate, authorizeAdmin, uploadVideo);
router.post("/initializeNewProject",createNewProject)//working 
// .get("/getProject",getProjectDetail)
router.post("/addVideo", upload1.single("video"), uploadVideo);//working
router.post("/AddImageAssests",upload.array("image",10),uploadImage).delete("/deleteImageAssests",deleteImageAssest);//upload and delete  image working
router.post("/AddVideoAssests",upload.array("video",10),uploadVideoAssests);//working 
router.post("/AddAudioAssests",upload.array("audio",10),uploadAudioAssests);//working 

// router.delete("/:id", authenticate, authorizeAdmin, deleteVideo);
router.delete("/delete/:videoKey", deleteVideo);
// router.get("/getAllProject",getProjects)
// router.put("/:id", authenticate, editVideo);
router.get("/download/:id", downloadVideo);
router.get("/allProjects",fetchAllVideos)//working
router.get("/allImages",fetchAllImages)
router.get("/allReels",fetchAllReel)
router.get("/singleProject/:id",getSingleVideo)//working

router.get("/singleImage/:id",getSingleImage)

router.get("/singleReel/:id",getSingleReel)

router.put("/updateVideo",updateMedia)

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
