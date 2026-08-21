import mongoose from 'mongoose';
import env from './env.js';

export default async function connectDB() {
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(env.mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed Connecting to MongoDB", error.message);
    process.exit(1);
  }

  mongoose.connection.on('disconnected', () => {
    console.warn("MongoDB Disconnected");
  });
}
