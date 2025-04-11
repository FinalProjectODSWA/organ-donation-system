// routes/secureAccessRoutes.js
const express = require('express');
const router = express.Router();
const generateSignedUrl = require('../utils/generateSignedUrl');
const nodemailer = require('nodemailer');

const otpStore = {}; // In-memory OTP store

// Setup transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD, // Use app password if Gmail
  },
});

// Generate random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Route to request OTP
router.post('/request-otp', async (req, res) => {
  const { email } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const otp = generateOTP();
  otpStore[email] = otp;

  // Auto-expire OTP in 5 minutes
  setTimeout(() => delete otpStore[email], 5 * 60 * 1000);

  // Send OTP to admin email
  try {
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: 'Your OTP for Document Access',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent to admin email' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Route to verify OTP and return signed URL
router.post('/verify-otp', async (req, res) => {
  const { email, otp, fileKey } = req.body;

  if (otpStore[email] !== otp) {
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  }

  try {
    const signedUrl = await generateSignedUrl(fileKey);
    delete otpStore[email]; // Invalidate OTP after use
    res.status(200).json({ url: signedUrl });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    res.status(500).json({ message: 'Could not generate signed URL' });
  }
});

module.exports = router;
