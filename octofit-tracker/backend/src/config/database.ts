import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const db = mongoose.connection;

export async function connectDatabase() {
  await mongoose.connect(connectionString, {
    dbName: 'octofit_db',
    serverSelectionTimeoutMS: 5000,
  });
  console.log('Connected to octofit_db');
}

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default db;
