const nodemailer = require('nodemailer');
const Receiver = require('../models/Receiver');
require('dotenv').config();

const sendEmailToMatchingReceivers = async (donor) => {
  try {
    console.log('🔍 Searching for matching receivers...');
    const receivers = await Receiver.find({
      bloodType: donor.bloodType,
      organ: donor.organ,
    });

    console.log(`✅ Found ${receivers.length} matching receivers`);

    if (receivers.length === 0) {
      console.log('⚠️ No matching receivers found.');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const receiver of receivers) {
      console.log(`📧 Sending email to ${receiver.contact}...`);
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receiver.contact,
        subject: 'Organ Available!',
        text: `Hello ${receiver.name},\n\nA matching donor is available for the ${donor.organ} you need.\nPlease contact the hospital or administration immediately.\n\nRegards,\nOrgan Donation Team`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${receiver.contact}`);
    }
  } catch (error) {
    console.error('❌ Error sending emails to receivers:', error);
  }
};

module.exports = sendEmailToMatchingReceivers;
