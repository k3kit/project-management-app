import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import jwtDecode from 'jwt-decode';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { boardId } from '../../store/slices/boards';
import { addTask, createColumns } from '../../store/slices/columns';
import { Jwt } from '../../types';
interface taskForm {
  title: string;
  description: string;
}
interface MyProps {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const TaskCreate: FC<MyProps> = ({ id, setOpen, open }) => {
  const { control, handleSubmit } = useForm<taskForm>();
  const dispatch = useAppDispatch();
  const tokenA = JSON.parse(localStorage.getItem('token') || 'null');
  const { boardId } = useParams();
  const tok = tokenA.token;
  const { t } = useTranslation();
  const decoded = jwtDecode<Jwt>(tok);
  const onSubmit: SubmitHandler<taskForm> = (data) => {
    if (boardId && id) {
      dispatch(
        addTask({
          boardId: boardId,
          columnsId: id,
          task: {
            title: data.title,
            description: data.description,
            userId: decoded.userId,
          },
        })
      );
    }
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{t('board_page.enter_task_name')}</DialogTitle>
        <DialogContent>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                label={t('board_page.title')}
                name="title"
                id="title"
                autoFocus
                required
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
        </DialogContent>
        <DialogContent>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                id="description"
                label={t('board_page.description')}
                name="description"
                required
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">{t('board_page.create')}</Button>
          <Button onClick={() => setOpen(false)}>{t('board_page.cancel')}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
