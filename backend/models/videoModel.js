import mongoose from "mongoose";
import User from "./userModel.js";

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "reel", "video"], required: true },
    streamUrl:{
      type:String,

    },
    tags:{
      type:[
        {type:String}
      ]
    },
    videoKey:{
      type:String
    },
    title: { type: String  },
    description: { type: String },
    duration: {
      // Video/reel specific
      type: String ,
    },
    thumbnail: {
      type: String,
    },
    size: {
      type: Number,
      minimum: 0,
    },
    status:{
      type:String,
      enum:["In Progress","Waiting to review","Approved"],
      default:"In Progress"
    }
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
