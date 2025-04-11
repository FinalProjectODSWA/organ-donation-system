import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleRequestOTP = async () => {
    const res = await fetch('/api/secure/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    alert(data.message);
    setOtpSent(true);
  };

  const handleVerifyOTP = async () => {
    // You may want to use this in the AdminFileAccess.js instead.
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Admin OTP Login</Typography>
      <Box>
        <TextField fullWidth label="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
        <Button variant="contained" color="primary" onClick={handleRequestOTP} fullWidth>
          Request OTP
        </Button>
        {otpSent && <Typography sx={{ mt: 2 }}>OTP Sent to your email.</Typography>}
      </Box>
    </Paper>
  );
};

export default AdminLogin;
