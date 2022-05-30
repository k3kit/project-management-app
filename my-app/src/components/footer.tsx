import React from 'react';
import { GitHub } from '@mui/icons-material';
import {
  BottomNavigationAction,
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import rs_svg from '../icon/rs_school.svg';
export const Footer = () => {
  return (
    <footer>
      <Box component="footer" sx={{ bgcolor: '#187bca', py: 2 }}>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" align="center" gutterBottom>
                <IconButton>
                  <GitHub></GitHub>
                </IconButton>
                <Link href="https://github.com/k3kit" underline="none" color="text.secondary">
                  GitHub: k3kit
                </Link>
              </Typography>
            </Grid>
            <Grid item sx={{ width: 70, height: 50 }}>
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
