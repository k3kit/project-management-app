import React, { useState } from 'react';
import { AppBar, Box, Button, Container, Dialog, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import LoginPage from '../login-page/loginPage';
import Register from '../login-page/Register';
const WelcomePage = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const { isLoggedIn } = useAppSelector((state) => state.authReducer);

  return (
    <>
      <Box>
        <AppBar position="sticky">
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }} variant="h6">
              Project management app
            </Typography>
            {isLoggedIn ? (
              <Button sx={{ mr: 2 }} size="small" variant="contained">
                <Link to="main"> Go to Main Page</Link>
              </Button>
            ) : (
              <>
                <Button
                  sx={{ mr: 2 }}
                  variant="contained"
                  size="medium"
                  onClick={() => setOpenSignIn(true)}
                >
                  <Link to="login"> Sign In</Link>
                </Button>
                <Button
                  sx={{ mr: 2 }}
                  variant="contained"
                  size="medium"
                  onClick={() => setOpenSignUp(true)}
                >
                  <Link to="register"> Sign Up </Link>
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <Container>
          {/* <Dialog open={openSignIn} onClose={() => setOpenSignIn(false)}>
            <LoginPage setOpenSignIn={setOpenSignIn} />
          </Dialog>
          <Dialog open={openSignUp} onClose={() => setOpenSignUp(false)}>
            <Register setOpenSignUp={setOpenSignUp} />
          </Dialog> */}
          <Typography align={'center'} variant="h1" component="div" gutterBottom>
            Welcome
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default WelcomePage;
