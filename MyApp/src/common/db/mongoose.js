import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("MongoDB connected");
};
