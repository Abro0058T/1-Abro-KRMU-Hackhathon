import mongoose from "mongoose";
import User from "./userModel.js";

const VideoEditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
    unique: true, // Ensure each video can have only one update record
  },
  role: {
    type: String,
    enum: ["videoEditor", "contentWriter"], // Only videoEditor/contentWriter role can update
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const VideoEdit = mongoose.model("VideoEdit", VideoEditSchema);

export default VideoEdit;
