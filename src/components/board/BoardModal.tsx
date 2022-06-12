import React, { useEffect } from 'react';
import { Container, CssBaseline, Box, TextField, Button, Grid } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { addBoard, boardsSlice, getBoards } from '../../store/slices/boards';
import { useTranslation } from 'react-i18next';

interface boardForm {
  title: string;
  description: string;
}

export const BoardModal = () => {
  const dispath = useAppDispatch();
  const { setOpen } = boardsSlice.actions;
  const { control, handleSubmit } = useForm<boardForm>();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<boardForm> = (data) => {
    dispath(setOpen(false));
    dispath(addBoard({ title: data.title, description: data.description }));
  };

  return (
    <Box>
      <Container
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
              label={t('board.board_name')}
              id="title"
              name="title"
              autoComplete="title"
              autoFocus
              required
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
              label={t('board.description')}
              id="description"
              name="description"
              autoComplete="description"
              required
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {t('board.create_board')}
        </Button>
        <Grid container>
          <Grid item xs></Grid>
        </Grid>
      </Container>
    </Box>
  );
};
