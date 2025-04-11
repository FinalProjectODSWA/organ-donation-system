import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const AdminFileAccess = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [fileKey, setFileKey] = useState('');
  const [url, setUrl] = useState('');

  const handleVerifyOTP = async () => {
    const res = await fetch('/api/secure/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, fileKey }),
    });

    const data = await res.json();
    if (data.url) {
      setUrl(data.url);
    } else {
      alert(data.message);
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Access Secure File</Typography>
      <Box>
        <TextField fullWidth label="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
        <TextField fullWidth label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} margin="normal" />
        <TextField fullWidth label="File Key (S3 filename)" value={fileKey} onChange={(e) => setFileKey(e.target.value)} margin="normal" />
        <Button variant="contained" color="success" onClick={handleVerifyOTP} fullWidth sx={{ mt: 2 }}>
          Get File Link
        </Button>
        {url && (
          <Typography sx={{ mt: 2 }}>
            <a href={url} target="_blank" rel="noreferrer">Open Secure Document</a>
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default AdminFileAccess;
