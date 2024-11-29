import dotenv from 'dotenv';
import connectDB from "./db/connection.js";
import app from './app.js';

dotenv.config();
const PORT = process.env.PORT || 2001;

connectDB()
    .then(() => {
        app.on('error', (error) => {
            console.log('⚠️  Error in coonection of DB:', error);
            process.exit(1);
        })

        app.listen(PORT, () => {
            console.log(`⚙️  server started at port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(`⚠️  MongoDb connection error: ${error}`);
    });