import mongoose from "mongoose";
import { config } from "dotenv";
import { logger } from "../logger/logger.js";

config();

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  logger.info("MongoDB connected");
};
