const express = require('express');
const router = express.Router();
const multer = require('multer');
const Receiver = require('../models/Receiver');
const { uploadFileToS3 } = require('../utils/s3Upload');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/register-receiver', upload.single('hospitalDocument'), async (req, res) => {
  try {
    const { name, age, bloodType, organ, contact } = req.body;

    let hospitalDocumentUrl = '';
    if (req.file) {
      const fileName = `receiver-hospital-doc-${Date.now()}.pdf`;
      hospitalDocumentUrl = await uploadFileToS3(req.file.buffer, fileName, req.file.mimetype);
    }

    const newReceiver = new Receiver({
      name,
      age,
      bloodType,
      organ,
      contact,
      hospitalDocument: hospitalDocumentUrl,
    });

    await newReceiver.save();
    res.status(201).json({ message: 'Receiver registered', receiver: newReceiver });
  } catch (err) {
    console.error('Error registering receiver:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

module.exports = router;
