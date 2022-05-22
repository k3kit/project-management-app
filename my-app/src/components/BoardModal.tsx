import React from 'react';
import { Container, CssBaseline, Box, TextField, Button, Grid } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../hooks/redux';
import { addBoard, boardsSlice } from '../store/slices/boards';

interface boardForm {
  title: string;
  description: string;
}

export const BoardModal = () => {
  const dispath = useAppDispatch();
  const { setOpen } = boardsSlice.actions;
  const { control, handleSubmit } = useForm<boardForm>();

  const onSubmit: SubmitHandler<boardForm> = (data) => {
    dispath(setOpen(false));
    dispath(addBoard({ title: data.title, description: data.description }));
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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              margin="normal"
              fullWidth
              label="description"
              id="description"
              name="description"
              autoComplete="description"
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
