import connectToDatabase from "@/lib/mongoose";
import Publication from "@/models/Publication";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    // Sort by newest first
    const publications = await Publication.find({}).sort({ createdAt: -1 });
    return NextResponse.json(publications, { status: 200 });
  } catch (error) {
    console.error("Error fetching publications:", error);
    return NextResponse.json({ error: "Failed to fetch publications" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const newPublication = await Publication.create(data);
    return NextResponse.json(newPublication, { status: 201 });
  } catch (error) {
    console.error("Error creating publication:", error);
    return NextResponse.json({ error: "Failed to create publication" }, { status: 500 });
  }
}
