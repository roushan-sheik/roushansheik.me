import { v2 as cloudinary } from "cloudinary";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import dns from "node:dns";

// Fix Node 18+ IPv6 DNS timeout issue
dns.setDefaultResultOrder("ipv4first");

// Configure Cloudinary only once
let isConfigured = false;

const configureCloudinary = () => {
  if (!isConfigured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    isConfigured = true;
  }
};

/**
 * Uploads a file buffer to Cloudinary.
 * Falls back to local storage if Cloudinary times out.
 * 
 * @param {Buffer} buffer - The file buffer to upload
 * @param {string} fileName - Original file name for fallback
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<string>} The secure URL of the uploaded image
 */
export async function uploadImage(buffer, fileName, folder = "portfolio") {
  configureCloudinary();

  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error("Cloudinary credentials not loaded.");
    }

    // 1. Try Cloudinary first
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, timeout: 10000 }, // 10s timeout
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return uploadResponse.secure_url;
  } catch (cloudError) {
    console.warn("Cloudinary upload failed, falling back to local storage:", cloudError.message);

    // 2. Fallback to Local Storage
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) { } // Ignore if directory already exists

    const safeFileName = `${Date.now()}-${fileName.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadDir, safeFileName);

    await writeFile(filePath, buffer);

    return `/uploads/${safeFileName}`;
  }
}

/**
 * Deletes an image from Cloudinary or local storage based on the URL.
 * 
 * @param {string} imageUrl - The URL of the image to delete
 * @returns {Promise<boolean>} True if deleted successfully
 */
export async function deleteImage(imageUrl) {
  if (!imageUrl) return false;

  try {
    // 1. Handle Local Storage fallback images
    if (imageUrl.startsWith("/uploads/")) {
      const fs = await import("fs/promises");
      const filePath = path.join(process.cwd(), "public", imageUrl);
      try {
        await fs.unlink(filePath);
        return true;
      } catch (err) {
        console.error(`Failed to delete local file ${filePath}:`, err.message);
        return false;
      }
    }

    // 2. Handle Cloudinary images
    if (imageUrl.includes("cloudinary.com")) {
      configureCloudinary();

      if (!process.env.CLOUDINARY_CLOUD_NAME) {
        throw new Error("Cloudinary credentials not loaded.");
      }

      // Extract public_id from Cloudinary URL
      // Example URL: https://res.cloudinary.com/demo/image/upload/v1234567890/portfolio/sample.jpg
      // public_id would be: portfolio/sample
      const urlParts = imageUrl.split("/");
      const uploadIndex = urlParts.findIndex(part => part === "upload");

      if (uploadIndex !== -1 && urlParts.length > uploadIndex + 2) {
        // Skip the 'v1234567890' version part (uploadIndex + 1)
        const pathParts = urlParts.slice(uploadIndex + 2);
        const fileNameWithExt = pathParts.pop();
        const fileName = fileNameWithExt.split(".")[0]; // Remove extension
        const folderPath = pathParts.join("/");

        const public_id = folderPath ? `${folderPath}/${fileName}` : fileName;

        const result = await cloudinary.uploader.destroy(public_id);
        return result.result === "ok";
      }
    }

    return false;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
}
