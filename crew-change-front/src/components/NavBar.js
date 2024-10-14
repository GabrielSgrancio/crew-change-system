import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position = "static">
            <Toolbar>
                <Typography variant = "h6" style={{flexGrow: 1}}>
                    Crew-Change
                </Typography>
                <Button color = "inherit" component = {Link } to="/">
                    Dashboard
                </Button>
                <Button color= "inherit" component = {Link} to= "/ships">
                    Navios
                </Button>
                <Button color= "inherit" component = {Link} to= "/flights">
                    Voos
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;