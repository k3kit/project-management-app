import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }} variant="h6">
              Project management app
            </Typography>
            <Button sx={{ mr: 2 }} variant="contained">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button sx={{ mr: 2 }} variant="contained">
              <Link to="/register">Sign Up</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <Container>
          <Typography>Welcome</Typography>
        </Container>
      </Box>
    </>
  );
};

export default WelcomePage;
