import express from "express";
import multer from "multer";
import { roles } from "../config/roles.js";

// controllers
import {
  uploadVideo,
  deleteVideo,
  downloadVideo,
  getPreSignedUrl,
  getFileNamesController,
  editVideo,
  getAttributes,
  //   deleteUser,
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

// test 2 - worked flawlessly
// import path from "path";
// import express from "express";
// import multer from "multer";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb is callback fn
//     cb(null, "uploads/");
//   },
//   // Define the filename for uploaded files
//   filename: (req, file, cb) => {
//     // extension name-> extname
//     const extname = path.extname(file.originalname);
//     // Create a new filename with field name, timestamp, and extension (Date is added for uniqueness of the filename)
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png||image\/webp/;

//   const extname = path.extname(file.originalname);
//   const mimetype = file.mimetype;
//   // Check if both extension and MIME type match
//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//     // Accept the file
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single("image");
// // Define middleware for uploading a single file named "image"

// router.post("/", (req, res) => {
//   // Apply single image upload middleware
//   uploadSingleImage(req, res, (err) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else if (req.file) {
//       // Check if a file was uploaded
//       res.status(200).send({
//         message: "Image uploaded successfully",
//         image: `/${req.file.path}`,
//         // Send path to uploaded image
//       });
//     } else {
//       res.status(400).send({ message: "No image file provided" });
//     }
//   });
// });

// export default router;

// test 1 - checked
// router.post(
//   "/",
//   upload.single("image"),
//   (req, res) => {
//     // ... uploadVideo implementation ...
//     res.status(200).json({ message: "File uploaded successfully" });
//   },
//   (error, req, res, next) => {
//     console.error(error); // Log the error details
//     res.status(500).json({ message: "Error uploading file" });
//   }
// );

// routes
//   router.post("/",authenticate, authorizeAdmin, uploadVideo);
router.post("/", upload.single("image"), uploadVideo);
// router.delete("/:id", authenticate, authorizeAdmin, deleteVideo);
router.delete("/delete/:id", deleteVideo);
// router.put("/:id", authenticate, editVideo);
router.get("/download/:id", downloadVideo);
router.get("/url/:id", getPreSignedUrl);
router.get("/list/", getFileNamesController);
// router.get(
//   "/download/:id",
//   userPermission([roles.admin, roles.videoEditor]),
//   downloadVideo
// );

// for editor, to edit the video
router.put("/edit/:id", editVideo);
router.get("/attributes/:id", getAttributes);

export default router;
