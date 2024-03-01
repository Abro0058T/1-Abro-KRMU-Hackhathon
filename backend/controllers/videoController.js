import asyncHandler from "../middlewares/asyncHandler.js";
import Video from "../models/videoModel.js";
import { downloadObject, uploadObject } from "../services/s3Service.js";
import crypto from "crypto";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const uploadVideo = async (req, res) => {
  //   console.log("req.body".req.body);
  //   console.log("req.file", req.file);

  const file = req.file;
  const fileBuffer = req.file.buffer;
  const videoName = generateFileName();

  await uploadObject(videoName, fileBuffer, file.mimetype);
};

export { uploadVideo };
