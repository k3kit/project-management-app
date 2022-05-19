import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography, TextField, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../hooks/redux';
import { deleteUsers } from '../store/slices/user';
import jwtDecode from 'jwt-decode';
import ConfirmDialog from './ConfirmationModal';
import { logout } from '../store/slices/Auth';
import { IFormEdit, Jwt } from '../types';
import { yupResolver } from '@hookform/resolvers/yup';
import validationShema from '../yup';

const EditProfile = () => {
  const dispath = useAppDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {
    control,
    formState: { errors },
  } = useForm<IFormEdit>({
    resolver: yupResolver(validationShema.validationEdit),
  });

  const handleDelete = () => {
    const tokenA = JSON.parse(localStorage.getItem('token') || 'null');
    const tok = tokenA.token;
    const decoded = jwtDecode<Jwt>(tok);
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
        <Typography variant="h5">Edit Profile</Typography>
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
