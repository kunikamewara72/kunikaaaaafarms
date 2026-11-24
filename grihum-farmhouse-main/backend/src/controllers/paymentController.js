const Payment = require('../models/Payment');

const createPaymentOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', bookingId } = req.body;
    // Simulated Razorpay Order Creation
    const orderId = 'order_' + Math.random().toString(36).substring(2, 10);
    res.json({
      orderId,
      amount,
      currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_grihum_farms_2026'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, bookingId, amount } = req.body;
    const payment = await Payment.create({
      bookingId,
      orderId,
      paymentId: paymentId || 'pay_' + Math.random().toString(36).substring(2, 10),
      amount,
      status: 'successful'
    });
    res.json({ status: 'verified', payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPaymentOrder, verifyPayment };
