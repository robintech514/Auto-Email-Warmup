import mongoose from 'mongoose';

const EmailConfigSchema = new mongoose.Schema({
  email: { type: String, required: true },
  appPassword: { type: String, required: true },
  numberOfEmailsPerDay: { type: Number, required: true },
  intervalInMinutes: { type: Number, required: true },
  increaseFrequencyOverTime: { type: Boolean, default: false },
  receiversEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('EmailConfig', EmailConfigSchema);
