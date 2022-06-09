import { yupResolver } from '@hookform/resolvers/yup';
import { Container, TextField, Button, Grid } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useParams } from 'react-router';
import { string } from 'yup/lib/locale';
import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/slices/Auth';
import { getColumnById, updateTask } from '../../store/slices/columns';
import { updateUser } from '../../store/slices/user';
import { IFormEdit, Jwt } from '../../types';
import validationShema from '../../yup';
import ConfirmDialog from '../modal/ConfirmationModal';
interface ITaskEdit {
  title?: string;
  description?: string;
}

interface MyProps {
  titleIntup: string;
  descriptionInput: string;
  columnsId: string;
  id: string;
  title: string;
  order: number;
  description: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const EditTask: FC<MyProps> = ({
  titleIntup,
  descriptionInput,
  columnsId,
  id,
  title,
  order,
  description,
  setOpen,
}) => {
  const { boardId } = useParams();
  const dispath = useAppDispatch();
  const { control, handleSubmit } = useForm<ITaskEdit>();

  const tokenA = JSON.parse(localStorage.getItem('token') || 'null');
  const tok = tokenA.token;
  const decoded = jwtDecode<Jwt>(tok);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ITaskEdit> = async (data) => {
    if (boardId && title && description) {
      await dispath(
        updateTask({
          boardId: boardId,
          columnsId: columnsId,
          taskId: id,
          task: {
            title: data.title || titleIntup,
            order: order,
            description: data.description || descriptionInput,
            userId: decoded.userId,
            boardId: boardId,
            columnId: columnsId,
          },
        })
      );
      if (boardId) {
        await dispatch(getColumnById({ boardId: boardId, columnId: columnsId }));
      }
    }
    setOpen(false);
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              margin="normal"
              fullWidth
              required
              label="Title"
              defaultValue={titleIntup}
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
              required
              label="description"
              defaultValue={descriptionInput}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
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
    </Container>
  );
};

export default EditTask;
