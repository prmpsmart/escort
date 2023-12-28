// server.ts
import express, { Request, Response } from "express";
import * as admin from "firebase-admin";
import multer from "multer";

const app = express();
const port = 3000;

// Initialize Firebase Admin
const serviceAccount = require("path/to/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-storage-bucket-url",
});

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

interface FileRequest extends Request {
  files: {
    [fieldname: string]: Array<Express.Multer.File>;
  };
}

// API endpoint for file upload
app.post(
  "/upload",
  upload.fields([
    { name: "images", maxCount: 20 },
    { name: "videos", maxCount: 20 },
  ]),
  async (req: multer.Request, res: Response) => {
    try {
      const images = req.files["images"];
      const videos = req.files["videos"];

      if (!images && !videos) {
        return res.status(400).send("No files uploaded.");
      }

      const bucket = admin.storage().bucket();

      // Upload images to Firebase Storage
      const imagePaths = await Promise.all(
        images
          ? images.map(async (image: any) => {
              const storagePath = `images/${image.originalname}`;
              await bucket.file(storagePath).save(image.buffer, {
                metadata: {
                  contentType: image.mimetype,
                },
              });
              return `https://firebasestorage.googleapis.com/v0/b/${
                bucket.name
              }/o/${encodeURIComponent(storagePath)}?alt=media`;
            })
          : []
      );

      // Upload videos to Firebase Storage
      const videoPaths = await Promise.all(
        videos
          ? videos.map(async (video: any) => {
              const storagePath = `videos/${video.originalname}`;
              await bucket.file(storagePath).save(video.buffer, {
                metadata: {
                  contentType: video.mimetype,
                },
              });
              return `https://firebasestorage.googleapis.com/v0/b/${
                bucket.name
              }/o/${encodeURIComponent(storagePath)}?alt=media`;
            })
          : []
      );

      // Store paths in MongoDB
      const paths = [...imagePaths, ...videoPaths];
      // await ImageVideoModel.create({ paths });

      res.status(200).send("Files uploaded successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
