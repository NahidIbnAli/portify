import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio", // folder to store images in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Set up multer with Cloudinary storage
const upload = multer({ storage });

export default upload;