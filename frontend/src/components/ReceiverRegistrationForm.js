import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const ReceiverRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodType: '',
    organ: '',
    contact: '',
    hospitalDocument: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));

    const res = await fetch('/api/receiver/register-receiver', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    alert(result.message);
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Register Receiver</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Age" name="age" type="number" onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Blood Type" name="bloodType" onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Organ Needed" name="organ" onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Contact Email" name="contact" onChange={handleChange} margin="normal" />
        <input type="file" name="hospitalDocument" onChange={handleChange} style={{ margin: '10px 0' }} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
      </Box>
    </Paper>
  );
};

export default ReceiverRegistrationForm;
