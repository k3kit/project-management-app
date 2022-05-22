import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createColumns } from '../../store/slices/columns';

export const ButtonCreate = () => {
  const [open, setOpen] = React.useState(false);
  const [titleInput, setTitleInput] = useState('');
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.columnsReducer);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
    console.log(titleInput);
  };

  const handleSubmit = () => {
    if (boardId) {
      setOpen(false);
      dispatch(
        createColumns({
          boardId,
          column: { title: titleInput },
        })
      );
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{ height: 50, width: 200, marginTop: 16 }}
      >
        add a column
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter column name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="title column"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
