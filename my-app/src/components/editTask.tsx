import { yupResolver } from '@hookform/resolvers/yup';
import { Container, CssBaseline, Box, Typography, TextField, Button, Grid } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { FC, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useParams } from 'react-router';
import { string } from 'yup/lib/locale';
import { decoded } from '../appConstants/api';
import { useAppDispatch } from '../hooks/redux';
import { logout } from '../store/slices/Auth';
import { updateTask } from '../store/slices/columns';
import { deleteUsers, updateUser } from '../store/slices/user';
import { IFormEdit, Jwt } from '../types';
import validationShema from '../yup';
import ConfirmDialog from './ConfirmationModal';
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
}
const EditTask: FC<MyProps> = ({
  titleIntup,
  descriptionInput,
  columnsId,
  id,
  title,
  order,
  description,
}) => {
  const { boardId } = useParams();
  const dispath = useAppDispatch();
  const { control, handleSubmit } = useForm<ITaskEdit>();

  const onSubmit: SubmitHandler<ITaskEdit> = (data) => {
    if (boardId && title && description) {
      dispath(
        updateTask({
          boardId: boardId,
          columnsId: columnsId,
          taskId: id,
          task: {
            title: data.title,
            order: order,
            description: data.description,
            userId: decoded.userId,
            boardId: boardId,
            columnId: columnsId,
          },
        })
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            fullWidth
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
            label="description"
            defaultValue={descriptionInput}
            autoFocus
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
  );
};

export default EditTask;

