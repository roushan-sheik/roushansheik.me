import connectToDatabase from "@/lib/mongoose";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary";

// Helper to extract image URLs from HTML content
const extractImageUrls = (htmlContent) => {
  if (!htmlContent) return [];
  const urls = [];
  const regex = /<img[^>]+src="?([^"\s]+)"?\s*\/?>/g;
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    urls.push(match[1]);
  }
  return urls;
};

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    // We can fetch by ID or by slug since this route handles both cases in the frontend
    // Check if params.id is a valid ObjectId, otherwise treat it as a slug
    const isObjectId = params.id.match(/^[0-9a-fA-F]{24}$/);
    
    let blog;
    if (isObjectId) {
      blog = await Blog.findById(params.id);
    } else {
      blog = await Blog.findOne({ slug: params.id });
    }

    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const data = await request.json();

    if (data.title && !data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    const oldBlog = await Blog.findById(params.id);
    if (oldBlog) {
      // 1. Check if thumbnail changed
      if (oldBlog.thumbnailUrl && oldBlog.thumbnailUrl !== data.thumbnailUrl) {
        await deleteImage(oldBlog.thumbnailUrl);
      }

      // 2. Check if any inline images were removed from content
      if (oldBlog.content !== data.content) {
        const oldImages = extractImageUrls(oldBlog.content);
        const newImages = extractImageUrls(data.content);
        
        // Find images that are in oldImages but NOT in newImages
        const removedImages = oldImages.filter(img => !newImages.includes(img));
        
        // Delete orphaned images
        for (const imgUrl of removedImages) {
          await deleteImage(imgUrl);
        }
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedBlog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "A blog with this title/slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const deletedBlog = await Blog.findByIdAndDelete(params.id);
    if (!deletedBlog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    
    // Delete thumbnail
    if (deletedBlog.thumbnailUrl) {
      await deleteImage(deletedBlog.thumbnailUrl);
    }

    // Delete all inline images from content
    const inlineImages = extractImageUrls(deletedBlog.content);
    for (const imgUrl of inlineImages) {
      await deleteImage(imgUrl);
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
