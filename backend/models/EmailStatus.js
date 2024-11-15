import mongoose from 'mongoose';

const EmailStatusSchema = new mongoose.Schema({
  email: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'sent', 'failed', 'replied'], default: 'pending' },
  timestamp: { type: Date, default: Date.now },
  expectedReplyTime: { type: Date },
});

export default mongoose.model('EmailStatus', EmailStatusSchema);
