import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, WEBP, GIF, and SVG are allowed." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use our new reusable utility function
    const url = await uploadImage(buffer, file.name);

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Failed to upload file: " + (error.message || String(error)) }, { status: 500 });
  }
}

