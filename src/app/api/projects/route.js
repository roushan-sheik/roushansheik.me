import connectToDatabase from "@/lib/mongoose";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    // Ensure tags are an array if passed as a string
    if (typeof data.tags === "string") {
      data.tags = data.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);
    }

    const newProject = await Project.create(data);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
