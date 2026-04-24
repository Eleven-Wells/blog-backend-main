import mongoose from 'mongoose';
import config from './environments';
import logger from '../services/logger.service';

async function connectDB() {

    if (!config.DATABASE_URI) {
        return logger.warn('Please add the database URI in the environment variable');
    };

    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(config.DATABASE_URI, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
        }
        logger.info('Connected to MongoDB');
    } catch (err) {
        logger.error('MongoDB error:', err)
        process.exit(1);
    }
}

export default connectDB;