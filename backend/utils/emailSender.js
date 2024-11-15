import nodemailer from 'nodemailer';
import EmailStatus from '../models/EmailStatus.js';

export const sendEmail = async (config) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.email,
      pass: config.appPassword,
    },
  });

  const mailOptions = {
    from: config.email,
    to: process.env.SMTP_EMAIL,
    subject: 'Sending Warmup Email',
    html: `<p>This is a warmup sending email. ${Date.now()}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    const status = new EmailStatus({ email: config.email, status: 'sent' });
    await status.save();
    console.log(`Email sent from ${config.email}`);
  } catch (error) {
    const status = new EmailStatus({ email: config.email, status: 'failed' });
    await status.save();
    console.error(`Failed to send email from ${config.email}:`, error);
  }
};

export const repliedEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Replying Warmup Email',
    html: `<p>This is a warmup replying email. ${Date.now()}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    const status = new EmailStatus({ email: email, status: 'replied' });
    await status.save();
    console.log(`Replied to email from ${email}`);
  } catch (error) {
    const status = new EmailStatus({ email: email, status: 'failed' });
    await status.save();
    console.error(`Failed to reply to email from ${email}:`, error);
  }
};
