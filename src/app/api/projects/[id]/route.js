import connectToDatabase from "@/lib/mongoose";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const project = await Project.findById(params.id);
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const data = await request.json();

    if (typeof data.tags === "string") {
      data.tags = data.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);
    }

    const oldProject = await Project.findById(params.id);
    if (oldProject && oldProject.thumbnailUrl && oldProject.thumbnailUrl !== data.thumbnailUrl) {
      await deleteImage(oldProject.thumbnailUrl);
    }

    const updatedProject = await Project.findByIdAndUpdate(params.id, data, { new: true });
    if (!updatedProject) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const deletedProject = await Project.findByIdAndDelete(params.id);
    if (!deletedProject) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    if (deletedProject.thumbnailUrl) {
      await deleteImage(deletedProject.thumbnailUrl);
    }

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
