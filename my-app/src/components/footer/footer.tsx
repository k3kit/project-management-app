import React from 'react';
import { GitHub } from '@mui/icons-material';
import {
  BottomNavigationAction,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

import rs_svg from '../../icon/rs_school.svg';
export const Footer = () => {
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <footer>
      <Box component="footer" sx={{ bgcolor: '#187bca', py: 3, mt: '10px' }}>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Button variant="text" color="inherit" startIcon={<GitHub />}>
                <Link href="https://github.com/k3kit" underline="none" color="text.secondary">
                  <Typography>k3kit</Typography>
                </Link>
              </Button>
            </Grid>
            <Grid item sx={{ width: 50, height: 50 }}>
              <Link href="https://rs.school/">
                <img src={rs_svg} alt="" />
              </Link>
            </Grid>
            <Grid item>
              <Typography>&copy;2022</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};
