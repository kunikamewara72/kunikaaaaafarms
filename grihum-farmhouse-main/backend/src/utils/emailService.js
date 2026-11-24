const nodemailer = require('nodemailer');
const INQUIRY_EMAIL = 'grihum.udr@gmail.com';

const sendInquiryEmail = async (inquiry) => {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('Email delivery is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS on the backend.');
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  const details = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Preferred dates: ${inquiry.preferredDates || 'Not provided'}`,
    `Guests: ${inquiry.guestsCount}`,
    '',
    'Message:',
    inquiry.message
  ].join('\n');

  return transporter.sendMail({
    from: process.env.SMTP_FROM || SMTP_USER,
    to: INQUIRY_EMAIL,
    replyTo: inquiry.email,
    subject: `Grihum Farms booking inquiry from ${inquiry.name}`,
    text: details
  });
};

module.exports = sendInquiryEmail;
