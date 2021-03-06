import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography, TextField, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import jwtDecode from 'jwt-decode';
import ConfirmDialog from '../modal/ConfirmationModal';
import { logout, deleteUsers } from '../../store/slices/Auth';
import { IFormEdit, Jwt } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import validationShema from '../../yup';
import { updateUser } from '../../store/slices/user';
import { useTranslation } from 'react-i18next';

const EditProfile = () => {
  const dispath = useAppDispatch();
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const tokenA = JSON.parse(localStorage.getItem('token') || '');
  const tok = tokenA.token;
  const decoded = jwtDecode<Jwt>(tok);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormEdit>({
    resolver: yupResolver(validationShema.validationEdit),
  });
  const handleDelete = () => {
    dispath(deleteUsers(decoded.userId));
  };

  const onSubmit: SubmitHandler<IFormEdit> = (data) => {
    dispath(
      updateUser({
        id: decoded.userId,
        user: { name: data.name, login: data.login, password: data.password },
      })
    );
    reset({
      name: '',
      login: '',
      password: '',
    });
  };
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">{t('edit_profile.title')}</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth={true}
                label={errors.name ? errors.name.message : t('edit_profile.user_name')}
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
                label={errors.login ? errors.login.message : t('edit_profile.login')}
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
                label={errors.password ? errors.password.message : t('edit_profile.password')}
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
            {t('edit_profile.delete')}
          </Button>
          <ConfirmDialog
            title={t('edit_profile.title_confirm')}
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={handleDelete}
          >
            <Typography>{t('edit_profile.confirm')}</Typography>
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
            {t('edit_profile.save')}
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
