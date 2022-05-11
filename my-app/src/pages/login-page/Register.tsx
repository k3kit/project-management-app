import { Container, CssBaseline, Box, Typography, TextField, Button, Grid } from '@mui/material';
import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { register } from '../../store/slices/Auth';
interface IFormRegister {
  name: string;
  login: string;
  password: string;
}

interface MyProps {
  setOpenSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}
const Register: FC<MyProps> = ({ setOpenSignUp }) => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.authReducer);
  const { control, handleSubmit } = useForm<IFormRegister>();

  const onSubmit: SubmitHandler<IFormRegister> = (data) => {
    dispatch(register(data));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 6,
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
            name="login"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                label="Login"
                autoComplete="Login"
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
            onClick={() => setOpenSignUp(false)}
            type="submit"
            variant="contained"
            fullWidth={true}
            disableElevation={true}
            sx={{
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            Sign Up
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
