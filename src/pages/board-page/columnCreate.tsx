import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { createColumns } from '../../store/slices/columns';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface boardForm {
  title: string;
}
export const ColumnCreate = () => {
  const [open, setOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const { t } = useTranslation();
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<boardForm>();

  const onSubmit: SubmitHandler<boardForm> = (data) => {
    console.log('sub');

    setOpen(false);
    if (boardId) {
      dispatch(
        createColumns({
          boardId,
          column: { title: data.title },
        })
      );
    }
  };

  return (
    <>
      <Box component="span" padding={5}>
        <Button
          startIcon={<AddBoxIcon />}
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{ height: 50, width: 200, marginTop: 16 }}
        >
          {t('board_page.add_column')}
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{t('board_page.enter_column_name')}</DialogTitle>
          <DialogContent>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label={t('board_page.board_name')}
                  id="title"
                  name="title"
                  autoFocus
                  required
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">{t('board_page.create')}</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
