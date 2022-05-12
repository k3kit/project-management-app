import { Container, CssBaseline, Box, Typography, TextField, Button, Grid } from '@mui/material';
import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { register } from '../../store/slices/Auth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormRegister {
  name: string;
  login: string;
  password: string;
}

interface MyProps {
  setOpenSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}
const Register: FC<MyProps> = ({ setOpenSignUp }) => {
  const validationShema = yup.object().shape({
    name: yup
      .string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    login: yup
      .string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.authReducer);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegister>({
    resolver: yupResolver(validationShema),
  });

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
                label={errors.name ? errors.name.message : 'Username'}
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
                label={errors.login ? errors.login.message : 'Login'}
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
                label={errors.password ? errors.password.message : 'Password'}
                type="password"
                autoComplete="current-password"
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
          <Button
            // onClick={() => setOpenSignUp(false)}
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
