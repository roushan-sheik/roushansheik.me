import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    summary: {
      type: [String],
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model("Profile", profileSchema);
