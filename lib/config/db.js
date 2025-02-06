// Import mongoose
import mongoose from 'mongoose';

// Get database URL from environment variables
const databaseUrl = process.env.DATABASE_URL;

// Database connection function for MongoDB
export const ConnectDB = async () => {
    await mongoose.connect(databaseUrl);
    console.log("DB Connected");
};