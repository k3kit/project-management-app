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
export const ButtonCreate = () => {
  const [open, setOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

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
    setTitleInput('');
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
          add a column
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Enter column name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="title column"
            type="text"
            fullWidth
            required
            variant="standard"
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
