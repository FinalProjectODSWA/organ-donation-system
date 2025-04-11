// routes/deathCertificateRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const Receiver = require('../models/Receiver');
require('dotenv').config(); // <-- Load .env variables

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `death-cert-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// Email transporter using Gmail with credentials from .env
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Set in .env
    pass: process.env.EMAIL_PASS  // Set in .env
  }
});

// Upload endpoint
router.post('/upload', upload.single('certificate'), async (req, res) => {
  const { organDonated, bloodType } = req.body;
  const filePath = req.file.path;

  try {
    const matchingReceivers = await Receiver.find({ organNeeded: organDonated, bloodType });

    for (let receiver of matchingReceivers) {
      await transporter.sendMail({
        from: `"Organ Donation System" <${process.env.EMAIL_USER}>`,
        to: receiver.contact,
        subject: 'Organ Availability Notification',
        text: `Dear ${receiver.name},\n\nA ${organDonated} is now available matching your requirements. Please contact your hospital or coordinator.\n\nRegards,\nOrgan Donation System`
      });
    }

    res.status(200).json({
      message: `Death certificate uploaded. Notified ${matchingReceivers.length} matching receiver(s).`,
      filePath
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload and notify.' });
  }
});

module.exports = router;
