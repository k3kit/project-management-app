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

interface boardForm {
  title: string;
}
export const ColumnCreate = () => {
  const [open, setOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<boardForm>();
  // const handleSubmit = () => {
  //   if (boardId) {
  //     setOpen(false);
  //     dispatch(
  //       createColumns({
  //         boardId,
  //         column: { title: titleInput },
  //       })
  //     );
  //   }
  //   setTitleInput('');
  // };
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
          add a column
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Enter column name</DialogTitle>
          <DialogContent>
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
                  required
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Create</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
