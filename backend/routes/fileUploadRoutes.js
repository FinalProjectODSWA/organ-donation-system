const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Donor = require('../models/Donor');
const Receiver = require('../models/Receiver');

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = 'uploads/hospital_docs';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + path.extname(file.originalname);
    cb(null, `doc-${suffix}`);
  }
});

const upload = multer({ storage });

// POST /api/files/upload
router.post('/upload', upload.single('document'), async (req, res) => {
  const { donorId, receiverId } = req.body;

  try {
    const filePath = req.file.path;

    if (donorId) {
      await Donor.findByIdAndUpdate(donorId, { hospitalDocument: filePath });
    } else if (receiverId) {
      await Receiver.findByIdAndUpdate(receiverId, { hospitalDocument: filePath });
    }

    res.status(200).json({
      message: 'Hospital document uploaded successfully',
      filePath
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

module.exports = router;
    