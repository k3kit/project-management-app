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
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const { t } = useTranslation();
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
                {t('welcome_page.part1')}
              </Typography>
              <Typography
                variant="h5"
                component="p"
                align="center"
                color="text.secondary"
                paragraph
              >
                {t('welcome_page.part2')}
              </Typography>
              <div>
                <Button sx={{ mr: 2 }} size="medium" variant="contained">
                  <Link to={isLoggedIn ? 'main' : 'login'}> {t('welcome_page.button')}</Link>
                </Button>
              </div>
            </Container>
            <Box component="div">
              <Box component="img" src={hero}></Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default WelcomePage;
