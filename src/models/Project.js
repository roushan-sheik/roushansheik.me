import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true }, // Emoji or small icon URL
    thumbnailUrl: { type: String, required: true },
    date: { type: String, required: true }, // e.g., "Jul 2026"
    stars: { type: Number, default: 0 },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    achievementsCount: { type: Number, default: 0 },
    demoUrl: { type: String, default: "" },
    sourceUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
