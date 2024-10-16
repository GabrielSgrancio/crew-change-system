import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
      <Toolbar>
        <Logo />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 2 }}>
          Crew Change
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/ships">
            Navios
          </Button>
          <Button color="inherit" component={Link} to="/crewmembers">
            Tripulantes
          </Button>
          <Button color="inherit" component={Link} to="/flights">
            Voos
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;