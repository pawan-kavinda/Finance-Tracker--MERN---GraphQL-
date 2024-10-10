import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });
const dbURI = process.env.MONGO_URI;
export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(dbURI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(`Error: ${err.message}`);
		process.exit(1);
	}
};