import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Layout = ({ children }) => (
  <>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6">Organ Donation System</Typography>
      </Toolbar>
    </AppBar>
    <Container style={{ marginTop: '2rem' }}>
      {children}
    </Container>
  </>
);

export default Layout;
