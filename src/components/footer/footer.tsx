import React from 'react';
import { Copyright, GitHub } from '@mui/icons-material';
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
    <Box component="footer" sx={{ bgcolor: 'rgb(76 118 189 / 33%)', py: 3, px: 2, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center">
          <Button variant="text" color="inherit" startIcon={<GitHub />}>
            <Link href="https://github.com/k3kit" underline="none" color="text.secondary">
              <Typography>k3kit</Typography>
            </Link>
          </Button>
          <Link href="https://rs.school/">
            <img src={rs_svg} alt="" width={50} />
          </Link>
          <Box display="flex">
            <Copyright />
            <Typography>2022</Typography>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};
