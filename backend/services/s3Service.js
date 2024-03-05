import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multerS3 from "multer-s3";

import dotenv from "dotenv";

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
    console.log("Object uploaded successfully", data.location);
  } catch (error) {
    console.error("Error uploading object:", error);
    throw error; // Re-throw for potential handling in calling code
  }
};

const deleteFile = async (fileName) => {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: fileName,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log(`File ${fileName} deleted successfully.`); // Added success message
  } catch (error) {
    console.error(`Error deleting file ${fileName}:`, error);
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

const fetchS3ObjectUrls = async () => {
  try {
    const params = {
      Bucket: bucketName, // Replace with your bucket name
    };

    const data = new ListObjectsV2Command(params);
    const ouptput = await s3Client.send(data);
    console.log(ouptput, "darta");
    const urls = data.Contents.map((object) =>
      s3Client.getSignedUrl("getObject", {
        Bucket: params.Bucket,
        Key: object.Key,
      })
    );

    return urls;
  } catch (error) {
    console.error("Error fetching S3 object URLs:", error);
    throw error; // Re-throw for route handler
  }
};

// const fetchS3ObjectUrls = async (req, res) => {
//   try {
//     const params = { Bucket: bucketName }; // Replace with your bucket name
//     console.log(s3Client);
//     const data = await s3Client.listObjectsV2(params).promise();

//     res.status(200).json({ contents: data.Contents });
//   } catch (error) {
//     console.error("Error accessing S3 bucket:", error);
//     res.status(500).json({ message: "Failed to retrieve bucket contents" });
//   }
// };

// an alternate to fetchS3ObjectUrls
const getFileNames = async () => {
  const params = {
    Bucket: bucketName,
  };
  console.log(bucketName);

  const command = new ListObjectsV2Command({ Bucket: bucketName });

  try {
    const data = await s3Client.send(command);
    console.log(data[0]);
    return data.Contents.map((obj) => obj.Key); // Extract filenames from contents
  } catch (error) {
    console.error("Error listing objects:", error);
    throw error; // Re-throw for handling in the route handler
  }
};

// const downloadObject = async (key, body) => {
//   try {
//     const command = new GetObjectCommand({
//       Bucket: bucketName,
//       Key: key,
//     });
//     const response = await s3Client.send(command);
//     // console.log(response);

//     const uploadDir = "uploads/"; // Adjust path as needed
//     const filePath = uploadDir + downloadFilename;

//     // Create upload directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     fs.writeFileSync(filePath, response.Body);
//     console.log(`Object downloaded and saved to: ${filePath}`);
//     return response.Body; // Return the downloaded data stream
//   } catch (error) {
//     console.error("Error downloading object:", error);
//     throw error; // Re-throw for potential handling in calling code
//   }
// };

const downloadObject = async (key, res) => {
  try {
    // const filename = key.params.id
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const data = await s3Client.send(command); // Send the command to S3 and use data object
    // console.log(data,"Data");
    return data;
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

const preSignedUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  const url = await getSignedUrl(S3Client, command);
  console.log("S3Client:::: ", S3Client);
  console.log("Url", url);
  return url;
};

export {
  uploadObject,
  deleteFile,
  downloadObject,
  fetchS3ObjectUrls,
  getObjectSignedUrl,
  getFileNames,
  getVideo,
  uploadEditedVideo,
  preSignedUrl,
};
