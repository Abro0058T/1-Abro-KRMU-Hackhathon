import mongoose from "mongoose";
import User from "./userModel.js";

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,//admin id
      ref: User,
      required: true,
    },
    url: { type: String },
    type: { type: String, enum: ["image", "reel", "video"], required: true },
    streamUrl: {
      type: String,
    },
    tags: {
      type: [{ type: String }],
    },
    videoKey: {
      type: String,
    },
    title: { type: String },
    description: { type: String },
    duration: {
      // Video/reel specific
      type: String,
    },
    thumbnail: {
      type: String,
    },
    size: {
      type: Number,
      minimum: 0,
    },
    clips: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    audio: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["In Progress", "Waiting to review", "Approved"],
      default: "In Progress",
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
