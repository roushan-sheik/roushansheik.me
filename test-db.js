import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb+srv://mernwarrior007:mernwarrior007@cluster0.jcygjjz.mongodb.net/roushansheik";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);
  const admins = await Admin.find({});
  console.log("Total admins:", admins.length);
  if (admins.length > 0) {
    console.log("Admin email:", admins[0].email);
    const isMatch = await bcrypt.compare("String1234", admins[0].password);
    console.log("Password matches 'String1234':", isMatch);
  }
  mongoose.disconnect();
}
run();
