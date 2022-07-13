import mongoose from 'mongoose';
import environments from '../../config/environments.js';

const MONGOD_DB = environments.MONGOD_DB;

const connectToMongoDB = async() => {
    try {
        await mongoose.connect(MONGOD_DB);

        console.log('MongoDB connected!');
    } catch (error) {
        throw error;
        process.exit(1);
    }
}

export default connectToMongoDB;