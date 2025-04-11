import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';

const DeathCertificateUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('deathCertificate', file);

    const res = await fetch('/api/death/upload-certificate', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    alert(result.message);
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Upload Death Certificate</Typography>
      <Box component="form" onSubmit={handleUpload}>
        <input type="file" name="deathCertificate" onChange={(e) => setFile(e.target.files[0])} />
        <Button type="submit" variant="contained" color="error" fullWidth sx={{ mt: 2 }}>
          Upload
        </Button>
      </Box>
    </Paper>
  );
};

export default DeathCertificateUploadForm;
