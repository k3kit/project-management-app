import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { FC } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import authHeader from '../../services/auth-header';
import { login } from '../../store/slices/Auth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CharacterSlice } from '../../store/slices/Message';

interface IFormLogin {
  login: string;
  password: string;
}
interface MyProps {
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const validationShema = yup.object().shape({
  login: yup
    .string()
    .required('Login is required')
    .min(4, 'Login must be at least 4 characters')
    .max(20, 'Login must not exceed 20 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
});
const LoginPage: FC<MyProps> = ({ setOpenSignIn }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: yupResolver(validationShema),
  });
  const { addMessageError } = CharacterSlice.actions;
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.messageReducer);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(addMessageError(''));
  };

  const onSubmit: SubmitHandler<IFormLogin> = (data) => {
    dispatch(login(data));
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
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="login"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                id="login"
                label={errors.login ? errors.login.message : 'Login'}
                name="login"
                autoComplete="login"
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Snackbar open={error ? true : false} autoHideDuration={3000}>
            <Alert
              onClose={handleClose}
              sx={{
                marginTop: 1,
                marginBottom: 1,
              }}
              severity="warning"
            >
              {error}
            </Alert>
          </Snackbar>
          <Grid container>
            <Grid item xs></Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;
