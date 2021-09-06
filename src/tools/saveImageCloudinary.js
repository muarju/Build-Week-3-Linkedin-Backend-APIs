import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const saveImageCloudinary = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "linkedin-images",
  },
});

export default saveImageCloudinary;
