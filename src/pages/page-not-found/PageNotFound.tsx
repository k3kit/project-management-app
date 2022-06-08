import { Box, Typography } from '@mui/material';
import React from 'react';

export const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1" component="div">
        404
      </Typography>
      <Typography variant="h3" component="div">
        Page Not Found
      </Typography>
    </Box>
  );
};
