import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

const ReceiverMatchForm = () => {
  const [bloodType, setBloodType] = useState('');
  const [organ, setOrgan] = useState('');
  const [matches, setMatches] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/receiver/match?bloodType=${bloodType}&organ=${organ}`);
    const data = await res.json();
    setMatches(data.matches || []);
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Find Matching Donors</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth label="Blood Type" value={bloodType} onChange={(e) => setBloodType(e.target.value)} margin="normal" />
        <TextField fullWidth label="Organ" value={organ} onChange={(e) => setOrgan(e.target.value)} margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth>Search</Button>
      </Box>
      <Box mt={3}>
        {matches.map((match, index) => (
          <Typography key={index}>✅ Donor: {match.name} - {match.organ}</Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default ReceiverMatchForm;
