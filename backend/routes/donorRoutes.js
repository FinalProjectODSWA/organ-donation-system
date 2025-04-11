const express = require('express');
const router = express.Router();
const multer = require('multer');
const Donor = require('../models/Donor');
const { uploadFileToS3 } = require('../utils/s3Upload');
const sendEmailToMatchingReceivers = require('../utils/sendEmailToMatchingReceivers'); // ✅ STEP 1: Import email function

const upload = multer({ storage: multer.memoryStorage() });

router.post('/register-donor', upload.single('hospitalDocument'), async (req, res) => {
  try {
    const { name, age, bloodType, organ, contact } = req.body;

    let hospitalDocumentUrl = '';
    if (req.file) {
      const fileName = `donor-hospital-doc-${Date.now()}.pdf`;
      hospitalDocumentUrl = await uploadFileToS3(req.file.buffer, fileName, req.file.mimetype);
    }

    const newDonor = new Donor({
      name,
      age,
      bloodType,
      organ,
      contact,
      hospitalDocument: hospitalDocumentUrl,
    });

    await newDonor.save();

    // ✅ STEP 2: Call email notification function here
    try {
      await sendEmailToMatchingReceivers(newDonor);
    } catch (emailErr) {
      console.error('❌ Error sending email notification:', emailErr);
    }

    res.status(201).json({ message: 'Donor registered', donor: newDonor });
  } catch (err) {
    console.error('Error registering donor:', err);
    res.status(500).json({ message: 'Server error during donor registration' });
  }
});

module.exports = router;
