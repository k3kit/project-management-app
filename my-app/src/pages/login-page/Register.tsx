import { Container, CssBaseline, Box, Typography, TextField, Button, Grid } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
interface IFormRegister {
  name: string;
  email: string;
  password: string;
}
const Register = () => {
  const { control, handleSubmit } = useForm<IFormRegister>();

  const onSubmit: SubmitHandler<IFormRegister> = (data) => {
    console.log(data);
  };
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
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth={true}
                label="Username"
                autoComplete="name"
                autoFocus
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth={true}
            disableElevation={true}
            sx={{
              marginTop: 2,
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
