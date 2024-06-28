import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import { config } from "dotenv";
import { readFile, readFileSync } from "fs";
config();

AWS.config.update({ region: "ap-south-1" });

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv";
import { exit } from "process";
import { unlink } from "fs";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const s3 = new AWS.S3();

const uploadObject = async (fileName, fileBuffer, mimetype) => {
  try {
    // console.log(process.env.AWS_ACCESS_KEY);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype,
    });

    // console.log("Blan Blank", command);
    const data = await s3Client.send(command);
    console.log("Object uploaded successfully", data);
    const transcoder = new AWS.ElasticTranscoder();
    const job = await transcoder
      .createJob({
        PipelineId: "1719494195718-tq2ms8",
        Input: {
          Key: fileName,
          Container: "mp4",
        },
        Output: {
          Key: `output/${fileName}`,
          PresetId: "1351620000000-000010",
        },
      })
      .promise();
    console.log(job);
    return job
  } catch (error) {
    console.error("Error uploading object:", error);
    throw error; // Re-throw for potential handling in calling code
  }
};

const deleteAssests = async (imageKeys,userId,type) => {
  try {
    const imageKey=imageKeys[imageKeys.length-1]
    console.log(imageKey)
    const deleteParams = {
      Bucket: bucketName,
      Key: `user/${userId}/${type}/${imageKey}`,
    };
    console.log(deleteParams)
    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log(`File  deleted successfully.`); // Added success message
  } catch (error) {
    console.error(`Error deleting file :`, error);
    throw error; // Re-throw for potential handling in calling code
  }
};

// S3 Pre-signed URLs: Provide temporary access to an S3 object for someone who doesn't have an AWS account , here video-editor and content-writer
const getObjectSignedUrl = async (key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  const seconds = 60;

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
    return url;
  } catch (error) {
    console.error(`Error getting signed URL for ${key}:`, error);
    throw error; // Re-throw for potential handling in calling code
  }
};

// an alternate to fetchS3ObjectUrls
const getFileNames = async () => {
  const params = {
    Bucket: bucketName,
  };
  console.log(bucketName);

  const command = new ListObjectsV2Command({ Bucket: bucketName });

  try {
    const data = await s3Client.send(command);
    return data.Contents.map((obj) => obj.Key); // Extract filenames from contents
  } catch (error) {
    console.error("Error listing objects:", error);
    throw error; // Re-throw for handling in the route handler
  }
};

const downloadObject = async (key, res) => {
  try {
    // const filename = key.params.id
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const data = await s3Client.send(command); // Send the command to S3 and use data object
    const Data = data.Body.toString("utf-8");
    console.log("Data3889383938338     ", Data);
    return Data;
  } catch (error) {
    console.error("Error downloading object", error);
    res.status(500).json({ message: "Failed to download object" });
  }
};

// for editor to upload the video
const uploadEditedVideo = async (itemId, video) => {
  const params = {
    Bucket: bucketName,
    Key: itemId, // Replace with S3 object key structure
    Body: video, // Video data (stream, buffer, etc.)
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error; // Re-throw for handling in the controller
  }
};

const getVideo = async (itemId) => {
  const params = {
    Bucket: bucketName,
    Key: itemId, // Replace with S3 object key structure
  };

  try {
    const response = await s3Client.send(new GetObjectCommand(params));
    return response.Body;
  } catch (error) {
    console.error("Error getting video:", error);
    throw error; // Re-throw for handling in the controller
  }
};

// const getObjectAttributes = async (key) => {
//   const params = new GetObjectCommand({
//     Bucket: bucketName,
//     Key: key,
//   });

//   try {
//     const data = s3.getObject(params);
//     console.log("Object properties:", data.toString("utf-8")[0][0]);
//     return data.toString("utf-8");
//     if (data) {
//       const fileType = data.ContentType;
//       const fileSize = data.ContentLength;
//       const fileName = data.Key;

//       // Display extracted information
//       console.log(`File properties:`);
//       console.log(`  - File type: ${fileType}`);
//       console.log(`  - File size: ${fileSize} bytes`);
//       console.log(`  - File name: ${fileName}`);
//       // console.log("Object key:", objectKey);
//     } else {
//       console.log("No data available");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error retrieving object properties:", error);
//   }
// };


const uploadImageToS3=async (fileName,fileBuffer,mimeType,userid,type)=>{
  try{
    const fileContent=readFileSync(fileBuffer)//fileBuffer is file path
    const command=new PutObjectCommand({
      Bucket:bucketName,
      Key:`user/${userid}/${type}/${fileName}`,
      Body:fileContent,
      // ContentType:mimeType
    })
    await s3Client.send(command)
    await unlink(fileBuffer,()=>{
      console.log("file deleted")
    });
    return `https://cloudcontentsource.s3.ap-south-1.amazonaws.com/user/${userid}/${type}/${fileName}`
  }
  catch(error){
    console.log(error)
    throw new Error("eror uploading image ot s3")
  }
}

const uploadVideoToS3 = async (fileName, fileBuffer, mimetype,userid,type) => {
  try {
    // console.log(process.env.AWS_ACCESS_KEY);
    const fileContent=readFileSync(fileBuffer)//fileBuffer is file path
    console.log(fileBuffer
    )
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Body: fileContent,
      Key:`user/${userid}/${type}/${fileName}`,
      ContentType: mimetype,
    });

    // console.log("Blan Blank", command);
    const data = await s3Client.send(command);
    console.log("Object uploaded successfully", data);
    
  await unlink(fileBuffer,()=>{
    console.log("file deleted")
  });
    return `https://cloudcontentsource.s3.ap-south-1.amazonaws.com/user/${userid}/${type}/${fileName}`

  } catch (error) {
    console.error("Error uploading object:", error);
    throw error; // Re-throw for potential handling in calling code
  }
};

export {
  uploadObject,
  deleteAssests,
  downloadObject,
  getObjectSignedUrl,
  getFileNames,
  getVideo,
  uploadEditedVideo,
  uploadImageToS3,
  uploadVideoToS3
  // getObjectAttributes,
};
