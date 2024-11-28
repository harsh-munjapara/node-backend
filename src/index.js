import dotenv from 'dotenv';
import connectDB from "./db/connection.js";

dotenv.config();
connectDB();