import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { ModalProfileSlice } from '../store/slices/header';
import { deleteUsers } from '../store/slices/user';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import ConfirmDialog from './ConfirmationModal';
import { logout } from '../store/slices/Auth';
const validationShema = yup.object().shape({
  name: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must not exceed 20 characters'),
  login: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must not exceed 20 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
});
interface IFormEdit {
  name: string;
  login: string;
  password: string;
}
export interface Jwt {
  iat?: number;
  login?: string;
  userId: string;
}
const EditProfile = () => {
  const dispath = useAppDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { setOpenEditProfile } = ModalProfileSlice.actions;
  const { onedEditProfile } = useAppSelector((state) => state.modalReducer);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormEdit>({
    resolver: yupResolver(validationShema),
  });

  const handleDelete = () => {
    const tokenA = JSON.parse(localStorage.getItem('token') || 'null');
    const tok = tokenA.token;
    console.log(tok);

    const decoded = jwtDecode<Jwt>(tok);
    console.log(decoded.userId);
    dispath(deleteUsers(decoded.userId));
    dispath(logout());
  };
  return (
    <Container maxWidth="xs">
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
          Edit Profile
        </Typography>
        <form>
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
            fullWidth={true}
            disableElevation={true}
            variant="outlined"
            color="error"
            onClick={() => setConfirmOpen(true)}
            startIcon={<DeleteIcon />}
            sx={{
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            Delete profile
          </Button>
          <ConfirmDialog
            title="Delete profile?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={handleDelete}
          >
            Are you sure you want to delete this profile?
          </ConfirmDialog>
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
            Save
          </Button>
          <Grid container>
            <Grid item xs></Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default EditProfile;
