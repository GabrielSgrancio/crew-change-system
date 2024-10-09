import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
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
                
            </Toolbar>

        </AppBar>
    )
}