import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected To DB');
  } catch (error) {
    console.error('Error in connecting to DB', error);
    process.exit(1);
  }
};

export default connectDB;
