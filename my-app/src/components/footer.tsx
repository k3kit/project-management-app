import React from 'react';
import { GitHub } from '@mui/icons-material';
import { Container, IconButton, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const Footer = () => {
  return (
    <footer>
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            <IconButton>
              <GitHub></GitHub>
            </IconButton>
            <Link href="https://github.com/k3kit"> GitHub: k3kit</Link>
          </Typography>

          <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
            RS School
          </Typography>
        </Container>
      </Box>
    </footer>
  );
};
