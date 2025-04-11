import React from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import theme from './theme';
import DonorRegistrationForm from './components/DonorRegistrationForm';
import ReceiverRegistrationForm from './components/ReceiverRegistrationForm';
// Import other components as needed

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <h1>Organ Donation System</h1>
        <DonorRegistrationForm />
        <ReceiverRegistrationForm />
        {/* Add other components */}
      </Container>
    </ThemeProvider>
  );
}

export default App;
