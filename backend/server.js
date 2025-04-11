const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const donorRoutes = require('./routes/donorRoutes');
const receiverRoutes = require('./routes/receiverRoutes');
const adminRoutes = require('./routes/adminRoutes'); // ✅ Import admin routes
const deathCertificateRoutes = require('./routes/deathCertificateRoutes');
const fileUploadRoutes = require('./routes/fileUploadRoutes');



const app = express(); // Initialize app

// Middleware
app.use(cors());
app.use(express.json());

const secureAccessRoutes = require('./routes/secureAccessRoutes');
app.use('/api/secure', secureAccessRoutes);


// Use Routes
app.use('/api', donorRoutes);
app.use('/api', receiverRoutes);
app.use('/api/admin', adminRoutes); // ✅ Attach admin routes
app.use('/api/death-certificates', deathCertificateRoutes);
app.use('/api/files', fileUploadRoutes);


// MongoDB Connection
mongoose.connect('mongodb+srv://adminfo:Fahadba2004@finalproject.vazce23.mongodb.net/?retryWrites=true&w=majority&appName=Finalproject')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ DB Error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
