import EmailConfig from '../models/EmailConfig.js';
import { scheduleEmails } from '../utils/emailScheduler.js';

export const configureEmail = async (req, res) => {
  try {
    const { userEmail, appPassword, numberOfEmails, timeInterval, receiver } = req.body;
    const config = new EmailConfig({
      email: userEmail,
      appPassword: appPassword,
      numberOfEmailsPerDay: numberOfEmails,
      intervalInMinutes: timeInterval,
      receiversEmail: receiver,
    });
    await config.save();
    scheduleEmails(config);
    res.status(201).send({ message: 'Configuration saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to save configuration.' });
  }
};
