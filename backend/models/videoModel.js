import mongoose from "mongoose";
// import User from "./userModel"

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: { type: "string", required: true },
    type: { type: "string", enum: ["image", "reel", "video"], required: true },
    uploadedAt: { type: "date", default: Date.now },
    title: { type: "string" },
    description: { type: "string" },
    length: {
      // Video/reel specific
      type: "number",
    },
    size: {
      type: "number",
      minimum: 0,
    },
  },
  { timestamps: true }
);

export default videoSchema;
