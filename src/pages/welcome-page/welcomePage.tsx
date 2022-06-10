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
import './welcomePage.scss';

const WelcomePage = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const { isLoggedIn } = useAppSelector((state) => state.authReducer);

  return (
    <>
      <Box>
        <Container>
          <Box component="section" className="welcome">
            <Container
              className="container"
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
                component="p"
                variant="h1"
                fontSize="2.75rem"
                color="text.primary"
                fontWeight="normal"
              >
                Project Management App helps teams move work forward.
              </Typography>
              <Typography
                variant="h5"
                component="p"
                align="center"
                color="text.secondary"
                paragraph
              >
                Collaborate, manage projects, and reach new productivity peaks. From high rises to
                the home office, the way your team works is unique—accomplish it all with PMApp.
              </Typography>
              <div>
                <Button sx={{ mr: 2 }} size="medium" variant="contained">
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
