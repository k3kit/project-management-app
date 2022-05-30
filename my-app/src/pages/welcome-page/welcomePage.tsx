import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
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
      <Box sx={{ bgcolor: '#cfe8fc' }}>
        <Container>
          <Container maxWidth="sm" sx={{ paddingTop: '20px' }}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Project Management System
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              A project management system is an application that helps an individual in a team or
              group of developers achieve their goals.
            </Typography>
            <Divider variant="middle" />
            <Stack sx={{ pt: 4 }} spacing={2} justifyContent="center">
              <Typography variant="h5" align="center" color="text.secondary">
                About the course
              </Typography>
              <Typography variant="h6" align="center" color="text.secondary">
                RS School is free-of-charge and community-based education program conducted by The
                Rolling Scopes developer community since 2013. Everyone can study at RS School,
                regardless of age, professional employment, or place of residence. The mentors and
                trainers of our school are front-end and javascript developers from different
                companies and countries.
              </Typography>
            </Stack>
            <Divider variant="middle" />
            <Stack sx={{ pt: 6 }} spacing={4} justifyContent="center">
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    About the team
                  </Typography>
                  <Typography variant="h5" component="div">
                    Nikita Berezkin
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Container>
        </Container>
      </Box>
    </>
  );
};

export default WelcomePage;
