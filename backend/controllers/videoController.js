import asyncHandler from "../middlewares/asyncHandler.js";
import VideoEdit from "../models/videoEditModel.js";
import Video from "../models/videoModel.js";
import {
  downloadObject,
  uploadObject,
  deleteFile,
  fetchS3ObjectUrls,
  getObjectSignedUrl,
  getFileNames,
  getVideo,
  uploadEditedVideo,
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
  const { id } = req.params;
  // console.log(id)
  await deleteFile(id);
};

const downloadVideo = async (req, res) => {
  const id = req.params.id;
  const data = await downloadObject(id);
  // console.log(data);
  res.set("Content-Type", "image/png/video/mp4"); // Example for video content
  res.set("Content-Disposition", "attachment; filename=myVideo.mp4"); // Example filename
  console.log(data.Body.IncomingMessage, "datyta body");
  res.json(data.Body);
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

const getPreSignedUrl = async (req, res) => {
  try {
    const urls = await getObjectSignedUrl(req); // Call controller function
    res
      .status(200)
      .json({ message: "Successfully fetched S3 object URLs", urls }); // JSON response with URLs
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(500).json({ message: "Failed to fetch S3 object URLs" });
  }
};

const getFileNamesController = async (req, res) => {
  try {
    const filenames = await getFileNames();
    res.json({ filenames });
  } catch (error) {
    console.error("Error fetching filenames:", error);
    res.status(500).json({ message: "Failed to fetch filenames" });
  }
};

const editVideo = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { title, description } = req.body;

    // 1. Validate request body:
    if (!itemId || !title || !description) {
      return res
        .status(400)
        .json({ message: "Missing required fields in request body" });
    }

    // Fetch the original video from S3 or any other storage
    const video = await getVideo(itemId);

    // Update video metadata in the schema
    const update = await Video.findOneAndUpdate(
      { itemId },
      { title, description },
      { new: true, upsert: true } // Create new document if not found
      // If you set upsert: true, Mongoose will create a new document if no document matches the query criteria. If a document matches the query, Mongoose will update it with the provided data.
    );

    if (!update) {
      // Create a new video record if not existing
      const newVideo = new Video({
        itemId,
        title,
        description,
        userId: req.user._id,
        type: "video",
      });
      await newVideo.save();

      // Create a new video edit record
      const newUpdate = new VideoEdit({
        itemId,
        role: "videoEditor",
        title,
        description,
        userId: req.user._id,
      });
      await newUpdate.save();
    }

    // Re-upload the updated video to S3 or any other storage
    await uploadEditedVideo(itemId, video);

    // Respond with success message
    res.json({ message: "Video updated successfully" });
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ message: "Failed to update video" });
  }
};

export {
  uploadVideo,
  deleteVideo,
  downloadVideo,
  fetchVideoUrls,
  getPreSignedUrl,
  getFileNamesController,
  editVideo,
};
