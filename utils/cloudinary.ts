import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const PETS_FOLDER = "brighteyes/pets";

export const isDataUri = (value: unknown): value is string =>
  typeof value === "string" && value.startsWith("data:");

//f_auto serves the smallest format the visitor's browser supports (AVIF/WebP),
//q_auto picks a quality level that shrinks the file without visible loss.
export const optimizedUrl = (publicId: string, version: number | string) =>
  `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/v${version}/${publicId}`;

//Uploads an image (data URI or remote URL) and returns the optimized delivery
//URL to store in MongoDB in place of the old inline base64.
export const uploadPetImage = async (image: string): Promise<string> => {
  const uploaded = await cloudinary.uploader.upload(image, {
    folder: PETS_FOLDER,
  });
  return optimizedUrl(uploaded.public_id, uploaded.version);
};

export default cloudinary;
