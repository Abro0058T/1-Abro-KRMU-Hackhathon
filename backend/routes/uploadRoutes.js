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

// import { uploadObject } from '../services/s3Service.js';
// import multer from 'multer'; // Optional, for multipart/form-data uploads

// const upload = multer({ dest: 'uploads/' }); // Optional, configure upload directory

// const uploadVideo = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const { bucketName, key } = req.body; // Extract bucket name and key from request body

//     await uploadObject(bucketName, key, req.file.buffer); // Use multer's buffer if applicable
//     res.status(201).json({ message: 'Video uploaded successfully' });
//   } catch (error) {
//     console.error('Error uploading video:', error);
//     res.status(500).json({ message: 'Error uploading video' }); // Handle errors gracefully
//   }
// };

// export default uploadVideo;
