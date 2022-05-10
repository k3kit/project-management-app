import { ThemeProvider } from '@emotion/react';
import { Copyright } from '@mui/icons-material';
import { Container, CssBaseline, Box, Typography, TextField, Button, Grid } from '@mui/material';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="login"
            name="login"
            autoComplete="login"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
