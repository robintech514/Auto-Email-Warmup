import cron from 'node-cron';
import EmailStatus from '../models/EmailStatus.js';
import { repliedEmail, sendEmail } from './emailSender.js';

export const scheduleEmails = (config) => {
  const interval = config.intervalInMinutes * 60 * 1000;
  for (let i = 0; i < config.numberOfEmailsPerDay; i++) {
    setTimeout(() => {
      sendEmail(config);
    }, i * interval);
  }
};

export const scheduleReply = () => {
  cron.schedule('* * * * *', async () => {
    const sentEmails = await EmailStatus.find({ status: 'sent' });
    if (sentEmails.length > 0) {
      sentEmails.forEach(async (email) => {
        const randomDelay = Math.random() * 3600 * 1000 + 1000;
        const expectedReplyTimeUTC = new Date(Date.now() + randomDelay);
        email.expectedReplyTime = expectedReplyTimeUTC;
        email.status = "scheduled";
        await email.save();
        console.log(`Replying to email sent from ${email.email} at ${expectedReplyTimeUTC} (IST)`);

        setTimeout(async () => {
          repliedEmail(email.email);
        }, randomDelay);
      });
    }
  });
};
