import React, { FC, useEffect } from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Snackbar,
  AppBar,
  Toolbar,
  Avatar,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { register } from '../../store/slices/Auth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { CharacterSlice } from '../../store/slices/Message';
import validationShema from '../../yup';
import { Link, useNavigate } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useTranslation } from 'react-i18next';
interface IFormRegister {
  name: string;
  login: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormRegister>({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
    resolver: yupResolver(validationShema.validationRegister),
  });

  const dispatch = useAppDispatch();
  const { addMessageError, addStatusText } = CharacterSlice.actions;
  const { error, statusText } = useAppSelector((state) => state.messageReducer);
  const { isLoading, isRegister, isLoggedIn } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn, navigate]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(addMessageError(''));
  };

  const onSubmit: SubmitHandler<IFormRegister> = (data) => {
    dispatch(register(data));
    reset({ name: '', login: '', password: '' });
  };

  return (
    <Box height="100vh">
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AppRegistrationIcon fontSize="large" />
          <Typography component="h1" variant="h5">
            {t('register_page.title')}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth={true}
                  label={errors.name ? errors.name.message : t('register_page.user_name')}
                  autoComplete="name"
                  autoFocus
                  value={field.value}
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
                  label={errors.login ? errors.login.message : t('register_page.login')}
                  autoComplete="login"
                  value={field.value}
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
                  label={errors.password ? errors.password.message : t('register_page.password')}
                  type="password"
                  autoComplete="current-password"
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
            {isLoading ? (
              <LoadingButton size="large" variant="contained" loading={isLoading} fullWidth={true}>
                {t('register_page.title')}
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                variant="contained"
                fullWidth={true}
                disableElevation={true}
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                }}
              >
                {t('register_page.title')}
              </Button>
            )}
            <Button
              variant="outlined"
              fullWidth={true}
              disableElevation={true}
              color="inherit"
              sx={{
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              <Link to="/login"> {t('register_page.login_link')}</Link>
            </Button>
            <Snackbar open={error ? true : false} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                }}
                severity="warning"
              >
                {error}
              </Alert>
            </Snackbar>
            <Snackbar
              onClose={() => dispatch(addStatusText(''))}
              open={statusText ? true : false}
              autoHideDuration={3000}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Alert
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                }}
                severity="success"
              >
                {statusText}
              </Alert>
            </Snackbar>
            <Grid container>
              <Grid item xs></Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
