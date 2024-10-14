import React from 'react';
import { Box } from '@mui/material';
import logo from '../assets/logo.png'; 

const Logo = () => {
  return (
    <Box>
      <img src={logo} alt="Logo" style={{ height: 50 }} />
    </Box>
  );
};

export default Logo;
