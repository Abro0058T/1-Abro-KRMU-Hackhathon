import asyncHandler from "../middlewares/asyncHandler.js";
import Video from "../models/videoModel.js";
import {
  downloadObject,
  uploadObject,
  deleteFile,
} from "../services/s3Service.js";
import crypto from "crypto";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const uploadVideo = async (req, res) => {
  const file = req.file;
  const fileBuffer = req.file.buffer;
  const videoName = generateFileName();

  await uploadObject(videoName, fileBuffer, file.mimetype);
};

// const donwloadVideo = async ()

const deleteVideo = async (req, res) => {
  const id = +req.params.id;
  // console.log(id)
  await deleteFile(id);
};

export { uploadVideo, deleteVideo };
