import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import emailRoutes from './routes/emailRoutes.js';
import connectDB from './config/db.js';
import { scheduleReply } from './utils/emailScheduler.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send("Server is live");
});
// Use routes
app.use('/api', emailRoutes);

// Start server and initialize email scheduling
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
  scheduleReply();
});
