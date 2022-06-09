import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import hero from '../../icon/hero.png';
import { useAppSelector } from '../../hooks/redux';
const WelcomePage = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const { isLoggedIn } = useAppSelector((state) => state.authReducer);

  return (
    <>
      {/* <AppBar position="sticky">
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
      </AppBar> */}
      <Box>
        <Container>
          <Box component="section" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Container
              component="div"
              maxWidth="sm"
              sx={{
                paddingTop: '20px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography
                component="div"
                variant="h1"
                fontSize="2.75rem"
                color="text.primary"
                fontWeight="normal"
              >
                Project Management App helps teams move work forward.
              </Typography>
              <Typography
                variant="h5"
                component="div"
                align="center"
                color="text.secondary"
                paragraph
              >
                Collaborate, manage projects, and reach new productivity peaks. From high rises to
                the home office, the way your team works is unique—accomplish it all with PMApp.
              </Typography>
              <div>
                <Button sx={{ mr: 2 }} size="small" variant="contained">
                  <Link to={isLoggedIn ? 'main' : 'login'}> Start doing</Link>
                </Button>
              </div>
            </Container>
            <Box component="div">
              <Box component="img" sx={{ width: '350px' }} src={hero}></Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default WelcomePage;
