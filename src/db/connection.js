import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {

    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(connect.connection.host);

    } catch (error) {
        console.log('Error: ', error);
        process.exit(1);
    }
}

export default connectDB;