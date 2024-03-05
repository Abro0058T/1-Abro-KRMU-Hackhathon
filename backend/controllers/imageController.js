import Video from "../models/videoModel.js";
// import { uploadToS3, getFromS3 } from '../services/S3Service';
// import multer from "multer";
// const upload = multer({ dest: 'uploads/' }); // Configure upload destination if needed
import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose; // Use ObjectId for type safety

// GET - Get all images/reels
const getAllImagesReels = async (req, res) => {
  try {
    // code to fetch from s3 based on file/Content type

    const types = ["image", "reel"]; // Array of allowed types
    const videos = await Video.find({ type: { $in: types } }); // Filter by type
    console.log(videos);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Get a specific image/reel from schema and S3
const getSpecificImageReel = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalid user" });
    }

    const video = await Video.findById(id);
    if (!video || !["image", "reel"].includes(video.type)) {
      return res.status(404).json({ message: "Image/Reel not found" });
    }

    console.log(video);

    //Insert code to fetch from s3 based on id/key

    // const fileData = await getFromS3(video.url);
    // res.contentType(video.mimetype || "application/octet-stream"); // Set appropriate content type
    // res.send(fileData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Delete an image/reel
const deleteImageReel = async (req, res) => {
  try {
    // call delete functionality from s3 to delete on the basis of type

    const { id } = req.params;

    // Validate and sanitize ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    // Fetch the video and check if it exists and is an image/reel
    const video = await Video.findById(id);
    if (!video || !["image", "reel"].includes(video.type)) {
      return res.status(404).json({ message: "Image/Reel not found" });
    }

    // Delete the video from the database
    await Video.findByIdAndDelete(id);

    // Optionally, delete the associated file from S3 (if applicable)
    // ... (implement logic to delete from S3 based on video.url)

    res.json({ message: "Image/Reel deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); // Consider a more informative message if possible
  }
};

export { getAllImagesReels, getSpecificImageReel, deleteImageReel };
