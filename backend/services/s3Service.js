import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

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
    await s3Client.send(command);
    console.log("Object uploaded successfully");
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

// export async function getObjectSignedUrl(key) {
//   const params = {
//     Bucket: bucketName,
//     Key: key,
//   };

//   const command = new GetObjectCommand(params);
//   const seconds = 60;

//   try {
//     const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
//     return url;
//   } catch (error) {
//     console.error(`Error getting signed URL for ${key}:`, error);
//     throw error; // Re-throw for potential handling in calling code
//   }
// }

const downloadObject = async (key, body) => {
  try {
    const bucketName = bucketName;

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const response = await s3Client.send(command);
    return response.Body; // Return the downloaded data stream
  } catch (error) {
    console.error("Error downloading object:", error);
    throw error; // Re-throw for potential handling in calling code
  }
};

export { uploadObject, deleteFile, downloadObject };
