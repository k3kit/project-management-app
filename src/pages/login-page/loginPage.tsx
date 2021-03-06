import { useEffect } from 'react';
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
  AppBar,
  Toolbar,
  Avatar,
} from '@mui/material';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/slices/Auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { CharacterSlice } from '../../store/slices/Message';
import { Link, useNavigate } from 'react-router-dom';
import validationShema from '../../yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
interface IFormLogin {
  login: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>({
    resolver: yupResolver(validationShema.validationLogin),
  });
  const { addMessageError } = CharacterSlice.actions;
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.messageReducer);
  const { isLoggedIn, isLoading } = useAppSelector((state) => state.authReducer);

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

  const onSubmit: SubmitHandler<IFormLogin> = (data) => {
    dispatch(login(data));
  };

  return (
    <>
      <Box>
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AccountCircleIcon fontSize="large"></AccountCircleIcon>
            <Typography component="h1" variant="h5">
              {t('login_page.title')}
            </Typography>

            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              height="77vh"
            >
              <Controller
                name="login"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label={errors.login ? errors.login.message : t('login_page.login')}
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
                    label={errors.password ? errors.password.message : t('login_page.password')}
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />
              {isLoading ? (
                <LoadingButton
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                  variant="contained"
                  loading={isLoading}
                  fullWidth={true}
                >
                  {t('login_page.title')}
                </LoadingButton>
              ) : (
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {t('login_page.title')}
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
                <Link to="/register"> {t('login_page.CreateAcc')}</Link>
              </Button>
              <Snackbar open={error ? true : false} autoHideDuration={6000} onClose={handleClose}>
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
              <Grid container>
                <Grid item xs></Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default LoginPage;
