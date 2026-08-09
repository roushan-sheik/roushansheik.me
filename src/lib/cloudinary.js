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

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error("Cloudinary credentials not loaded.");
  }

  try {
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
    } catch (err) {} // Ignore if directory already exists
    
    const safeFileName = `${Date.now()}-${fileName.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadDir, safeFileName);
    
    await writeFile(filePath, buffer);
    
    return `/uploads/${safeFileName}`;
  }
}
