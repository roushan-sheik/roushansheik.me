import connectToDatabase from "@/lib/mongoose";
import Publication from "@/models/Publication";
import { NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const publication = await Publication.findById(params.id);
    if (!publication) return NextResponse.json({ error: "Publication not found" }, { status: 404 });
    return NextResponse.json(publication, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch publication" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    // Check if image changed to delete the old one
    const oldPublication = await Publication.findById(params.id);
    if (oldPublication && oldPublication.publisherIcon && oldPublication.publisherIcon !== data.publisherIcon) {
      await deleteImage(oldPublication.publisherIcon);
    }

    const updatedPublication = await Publication.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedPublication) return NextResponse.json({ error: "Publication not found" }, { status: 404 });
    return NextResponse.json(updatedPublication, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update publication" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const deletedPublication = await Publication.findByIdAndDelete(params.id);
    if (!deletedPublication) return NextResponse.json({ error: "Publication not found" }, { status: 404 });
    
    // Delete the associated image
    if (deletedPublication.publisherIcon) {
      await deleteImage(deletedPublication.publisherIcon);
    }
    
    return NextResponse.json({ message: "Publication deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete publication" }, { status: 500 });
  }
}
