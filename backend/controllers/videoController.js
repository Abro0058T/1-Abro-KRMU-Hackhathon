import { throws } from "assert";
import asyncHandler from "../middlewares/asyncHandler.js";
import VideoEdit from "../models/videoEditModel.js";
import Video from "../models/videoModel.js";
import {
  downloadObject,
  uploadObject,
  deleteFile,
  getObjectSignedUrl,
  getFileNames,
  getVideo,
  uploadEditedVideo,
  // getObjectAttributes,
} from "../services/s3Service.js";
import crypto from "crypto";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const uploadVideo = async (req, res) => {
 try{ const file = req.file;
  const {userId,title,description,tags}=req.body;
  const fileBuffer = req.file.buffer;
  const videoName = generateFileName();

console.log(videoName)

  // const uploadVideo=await uploadObject(videoName, fileBuffer, file.mimetype);
  // console.log(uploadVideo)
  const videoDetails={
    userId,
    url:`https://videoconverter-bucket-1.s3.ap-south-1.amazonaws.com/${videoName}`,
  type:"video",
  streamUrl:`https://d17flk31bq57al.cloudfront.net/${videoName}`,
  tags,
  videoKey:videoName,
title,
description,
duration:"",
size:"",
  }
  const uploadMedia= await  Video.create(videoDetails);
  console.log(uploadMedia);
  res.send("Successfully uploaded" + req.file.location + "location");}
  catch(error){
    console.log(error)
    throw new Error("Fail to upload media ")
  }
};

const uploadImage = async (req, res) => {
  try{ const file = req.file;
   const {userId,title,description,tags}=req.body;
   const fileBuffer = req.file.buffer;
   const videoName = generateFileName();
 
 
 
   const uploadVideo=await uploadObject(videoName, fileBuffer, file.mimetype);
   console.log(uploadVideo)
   const videoDetails={
     userId,
     url:`https://videoconverter-bucket-1.s3.ap-south-1.amazonaws.com/${videoName}`,
   type:"image",
   streamUrl:`https://d17flk31bq57al.cloudfront.net/${videoName}`,
   tags,
   videoKey:videoName,
 title,
 description,
 duration:"",
 size:"",
   }
   const uploadMedia= await  Video.create(videoDetails);
   console.log(uploadMedia);
   res.send("Successfully uploaded" + req.file.location + "location");}
   catch(error){
     console.log(error)
     throw new Error("Fail to upload media ")
   }
 };


 const uploadReel = async (req, res) => {
  try{ const file = req.file;
   const {userId,title,description,tags}=req.body;
   const fileBuffer = req.file.buffer;
   const videoName = generateFileName();
 
 
 
   const uploadVideo=await uploadObject(videoName, fileBuffer, file.mimetype);
   console.log(uploadVideo)
   const videoDetails={
     userId,
     url:`https://videoconverter-bucket-1.s3.ap-south-1.amazonaws.com/${videoName}`,
   type:"reel",
  //  streamUrl:`https://d17flk31bq57al.cloudfront.net/${videoName}`,
   tags,
   videoKey:videoName,
 title,
 description,
 duration:"",
 size:"",
   }
   const uploadMedia= await  Video.create(videoDetails);
   console.log(uploadMedia);
   res.send("Successfully uploaded" + req.file.location + "location");}
   catch(error){
     console.log(error)
     throw new Error("Fail to upload media ")
   }
 };
// const donwloadVideo = async ()

const deleteVideo = async (req, res) => {
try{  const { videoKey } = req.params;
const {videoId}=req.body;
  // console.log(id)
  await deleteFile(videoKey);
  const deleteMedia= await Video.findByIdAndDelete(videoId);  
  console.log(deleteMedia)
  res.status(200).send("video deleted success fully")
}
  catch(error){
    console.log(error)
    throw new Error("Video deletoin fail")
  }
};

const downloadVideo = async (req, res) => {
  const id = req.params.id;
  const data = await downloadObject(id);
  // console.log(data);
  res.set("Content-Type", "image/png/video/mp4"); // Example for video content
  res.set("Content-Disposition", "attachment; filename=myVideo.mp4"); // Example filename
  console.log(data.Body, "datyta body");
  res.json(data.Body);
};


const  fetchAllVideos=async(req,res)=>{
  try{
    const pipeline = [
      {$match:{type:"video"}},
      {
        $group: {
          _id: "$status",
          videos: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } }, // Sort groups by status
      { $unwind: "$videos" }, // Unwind grouped documents
      { $sort: { "videos.createdAt": -1 } }, // Sort videos within each group by creation date (descending)
    ];
const allvideos= await Video.aggregate(pipeline)
console.log(allvideos)
res.send(allvideos)
  }catch(error){
console.log(error)
throw new Error(error,"error")
  }
}

const  fetchAllImages=async(req,res)=>{
  try{
    
    const pipeline = [
      {$match:{type:"image"}},
      {
        $group: {
          _id: "$status",
          videos: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } }, // Sort groups by status
      { $unwind: "$videos" }, // Unwind grouped documents
      { $sort: { "videos.createdAt": -1 } }, // Sort videos within each group by creation date (descending)
    ];
const allvideos= await Video.aggregate(pipeline)
console.log(allvideos)
res.send(allvideos)
  }catch(error){
console.log(error)
throw new Error(error,"error")
  }
}

const  fetchAllReel=async(req,res)=>{
  try{
    
    const pipeline = [
      {$match:{type:"reel"}},
      {
        $group: {
          _id: "$status",
          videos: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } }, // Sort groups by status
      { $unwind: "$videos" }, // Unwind grouped documents
      // { $sort: { "videos.createdAt": -1 } }, // Sort videos within each group by creation date (descending)
    ];
const allvideos= await Video.aggregate(pipeline)
console.log(allvideos)
res.send(allvideos)
  }catch(error){
console.log(error)
throw new Error(error,"error")
  }
}
// const getPreSignedUrl = async (req, res) => {
//   try {
//     const urls = await getObjectSignedUrl(req); // Call controller function
//     res
//       .status(200)
//       .json({ message: "Successfully fetched S3 object URLs", urls }); // JSON response with URLs
//   } catch (error) {
//     console.error("Error in route handler:", error);
//     res.status(500).json({ message: "Failed to fetch S3 object URLs" });
//   }
// };

// const getFileNamesController = async (req, res) => {
//   try {
//     const filenames = await getFileNames();
//     console.log(filenames);
//     res.json({ filenames });
//   } catch (error) {
//     console.error("Error fetching filenames:", error);
//     res.status(500).json({ message: "Failed to fetch filenames" });
//   }
// };

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

const getAttributes = async (req, res) => {
  try {
    const data = await getObjectAttributes(req.params);
    console.log(data);
    res.json({ data });
  } catch (error) {
    console.error("Error fetching url:", error);
    res.status(500).json({ message: "Failed to fetch url" });
  }
};

const getSingleVideo=async(req,res)=>{
  try{
    const {id}=req.params;
    const video= await Video.findById(id);
    console.log(video)
    res.status(200).send(video)
  }catch(error){

  }
}
const getSingleImage=async(req,res)=>{
  try{
    const {id}=req.params;
    const video= await Video.findById(id);
    console.log(video)
    res.status(200).send(video)
  }catch(error){

  }
}
const getSingleReel=async(req,res)=>{
  try{
    const {id}=req.params;
    const video= await Video.findById(id);
    console.log(video)
    res.status(200).send(video)
  }catch(error){

  }
}

const updateMedia =async(req,res)=>{
  try{
    const data=Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !== ""));
    delete data["id"]
    const updateDate = await Video.findByIdAndUpdate(req.body.id,data,{new:true});
    res.status(200).send(updateDate)
  }catch(error){
    console.log(error)
    throw new Error("Video not updated")
  }
}
export {
  uploadVideo,
  uploadReel,
  uploadImage,
  deleteVideo,
  downloadVideo,
  // getPreSignedUrl,
  // getFileNamesController,
  updateMedia,
  getSingleVideo,
  getSingleImage,getSingleReel,
  editVideo,
  fetchAllImages,fetchAllReel,
  fetchAllVideos,
  getAttributes,
};
