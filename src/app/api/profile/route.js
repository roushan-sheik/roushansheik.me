import connectToDatabase from "@/lib/mongoose";
import Profile from "@/models/Profile";
import { NextResponse } from "next/server";
import { profile as defaultProfile, description as defaultDescription } from "@/data/profile";

export async function GET() {
  try {
    await connectToDatabase();
    // Assuming there's only one profile document for the portfolio
    let profile = await Profile.findOne();
    if (!profile) {
      return NextResponse.json({
        firstName: defaultProfile.firstName,
        lastName: defaultProfile.lastName,
        position: defaultProfile.position,
        summary: defaultProfile.summary,
        locationName: defaultProfile.location.name,
        avatarUrl: defaultProfile.avatar.srcPath,
        description: defaultDescription,
      }, { status: 200 });
    }
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    // Since it's a personal portfolio, we just maintain a single profile document
    let profile = await Profile.findOne();
    if (profile) {
      profile.firstName = data.firstName;
      profile.lastName = data.lastName;
      profile.position = data.position;
      profile.summary = data.summary;
      profile.locationName = data.locationName;
      
      if (data.avatarUrl) profile.avatarUrl = data.avatarUrl;
      if (data.description !== undefined) profile.description = data.description;
      
      await profile.save();
    } else {
      profile = await Profile.create(data);
    }

    return NextResponse.json({ message: "Profile updated successfully", profile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
