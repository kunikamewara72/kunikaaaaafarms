const Inquiry = require('../models/Inquiry');
const sendInquiryEmail = require('../utils/emailService');

const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, preferredDates, guestsCount, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'Name, email, phone, and message are required.' });
    }
    const inquiry = await Inquiry.create({
      name, email, phone, preferredDates, guestsCount, message
    });
    try {
      await sendInquiryEmail(inquiry);
    } catch (emailError) {
      console.error('Failed to email Grihum Farms inquiry:', emailError.message);
      return res.status(502).json({
        message: 'Inquiry was saved, but the email could not be sent. Please try again or contact the host directly.',
        inquiryId: inquiry._id
      });
    }

    res.status(201).json({ message: 'Inquiry saved and emailed to Grihum Farms.', inquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createInquiry };
