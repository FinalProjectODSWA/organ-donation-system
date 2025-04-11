import React, { useState } from 'react';
import {
  TextField, Button, Grid, Typography, Paper, Box
} from '@mui/material';
import axios from 'axios';

const DonorRegistrationForm = () => {
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
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await axios.post('/api/donors/register-donor', form);
      alert('Donor Registered!');
    } catch (err) {
      console.error(err);
      alert('Error registering donor');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Donor Registration
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {['name', 'age', 'bloodType', 'organ', 'contact'].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              Upload Hospital Document (PDF)
              <input
                type="file"
                name="hospitalDocument"
                accept="application/pdf"
                hidden
                onChange={handleChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Register Donor
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default DonorRegistrationForm;
