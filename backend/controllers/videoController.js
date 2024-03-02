import asyncHandler from "../middlewares/asyncHandler.js";
import Video from "../models/videoModel.js";
import {
  downloadObject,
  uploadObject,
  deleteFile,
  fetchS3ObjectUrls,
} from "../services/s3Service.js";
import crypto from "crypto";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const uploadVideo = async (req, res) => {
  const file = req.file;
  const fileBuffer = req.file.buffer;
  const videoName = generateFileName();

  await uploadObject(videoName, fileBuffer, file.mimetype);

  res.send("Successfully uploaded" + req.file.location + "location");
};

// const donwloadVideo = async ()

const deleteVideo = async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  await deleteFile(id);
};

const downloadVideo = async (req, res) => {
  const id = req.params.id;
  const data = await downloadObject(id);
  // console.log(data);
  res.set("Content-Type", "image/png/video/mp4"); // Example for video content
  res.set("Content-Disposition", "attachment; filename=myVideo.mp4"); // Example filename
  // console.log(data);
  res.send(data);
};

const fetchVideoUrls = async (req, res) => {
  try {
    const urls = await fetchS3ObjectUrls(); // Call controller function
    res
      .status(200)
      .json({ message: "Successfully fetched S3 object URLs", urls }); // JSON response with URLs
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(500).json({ message: "Failed to fetch S3 object URLs" });
  }
};

export { uploadVideo, deleteVideo, downloadVideo, fetchVideoUrls };
