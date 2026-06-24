const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

const s3 = new S3Client({
  endpoint: "https://s3.us-east-005.backblazeb2.com",
  region: "us-east-005",
  credentials: {
    accessKeyId: "005c6cc384cb0290000000001",
    secretAccessKey: "K005vlQG9AyEIZbPCZQa2/2GAse0I3k", 
  },
});

async function upload() {
  try {
    const filePath = "./test.mp3";

    const command = new PutObjectCommand({
      Bucket: "Spotify-ghost",
      Key: `songs/${Date.now()}-test.mp3`,
      Body: fs.createReadStream(filePath),
      ContentType: "audio/mpeg",
    });

    await s3.send(command);

    console.log("Upload successful");
  } catch (err) {
    console.error(err);
  }
}

upload();