import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addTask, columnsSlice } from '../../store/slices/columns';
interface Myprops {
  id: string;
}
export const CreateTask: FC<Myprops> = ({ id }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const { setOpen } = columnsSlice.actions;
  const { dialog } = useAppSelector((state) => state.columnsReducer);
  const { boardId } = useParams();
  const userId = JSON.parse(localStorage.getItem('user') || 'null');
  const IdUser = userId.id;
  const handleClick = () => {
    if (boardId) {
      dispatch(
        addTask({
          boardId: boardId,
          columnId: id,
          task: {
            title: title,
            description: description,
            userId: IdUser,
          },
        })
      );
    }

    dispatch(setOpen(false));
  };

  const handleClose = () => {
    dispatch(setOpen(false));
  };
  return (
    <>
      <Dialog open={dialog} onClose={handleClose}>
        <DialogContent>
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description "
            label="Description "
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="contained" onClick={handleClick}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
