import { Alert, Box, Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          flexDirection="column"
        >
          <Alert severity="error">
            <Typography>Something went wrong:</Typography>
            <Typography>{error.message}</Typography>
          </Alert>
          <Button
            onClick={resetErrorBoundary}
            startIcon={<ArrowBackIosIcon />}
            sx={{ marginLeft: '5' }}
          >
            Back
          </Button>
        </Box>
      </Container>
    </>
  );
}
