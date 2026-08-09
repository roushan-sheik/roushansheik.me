import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;

  // Seed Admin if it doesn't exist
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = process.env.ADMIN_EMAIL || "roushansheik@gmail.com";
      const rawPassword = process.env.ADMIN_PASSWORD || "String1234";
      const hashedPassword = await bcrypt.hash(rawPassword, 10);
      
      await Admin.create({
        email,
        password: hashedPassword,
      });
      console.log("Seeded default admin successfully");
    }
  } catch (seedError) {
    console.error("Failed to seed admin:", seedError);
  }

  return cached.conn;
}

export default connectToDatabase;
