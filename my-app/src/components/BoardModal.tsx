import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import { error } from 'console';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../hooks/redux';
import { addBoard, boardsSlice } from '../store/slices/boards';
interface ITitle {
  title: string;
}
export const BoardModal = () => {
  const dispath = useAppDispatch();
  const { setOpen } = boardsSlice.actions;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITitle>();

  const onSubmit: SubmitHandler<ITitle> = (data) => {
    console.log(data);
    dispath(setOpen(false));
    dispath(addBoard(data.title));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              margin="normal"
              fullWidth
              label="board name"
              id="title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Create board
        </Button>
        <Grid container>
          <Grid item xs></Grid>
        </Grid>
      </Box>
    </Container>
  );
};
