const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFileToS3 = async (fileBuffer, fileName, mimetype) => {
  const bucketName = process.env.AWS_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("S3 bucket name is missing from environment variables");
  }

  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

// ✅ Generate a signed URL to access file securely
const generateSignedUrl = async (fileName) => {
  const bucketName = process.env.AWS_BUCKET_NAME;

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  });

  // Signed URL valid for 5 minutes
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  return signedUrl;
};

module.exports = { uploadFileToS3, generateSignedUrl };
