import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
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

const fetchS3ObjectUrls = async () => {
  try {
    const params = {
      Bucket: bucketName, // Replace with your bucket name
    };

    const data = await s3Client.listObjectsV2(params).promise();

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
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error downloading object", error);
    res.status(500).json({ message: "Failed to download object" });
  }
};

export { uploadObject, deleteFile, downloadObject, fetchS3ObjectUrls };
