import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    publisher: { type: String, required: true },
    publisherIcon: { type: String, default: "" },
    date: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Publication || mongoose.model("Publication", publicationSchema);
