import React, { ChangeEvent, FC, useState } from 'react';
import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { deleteColums, updateTitleColumns } from '../../store/slices/columns';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { IColumn } from '../../types';
import ConfirmDialog from '../../components/ConfirmationModal';

export const BoardItem: FC<IColumn> = ({ id, title, order }) => {
  const [titleInput, setTitleInput] = useState(title);
  const [titleEdit, setTitleEdit] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  const handleSubmit = (titleInput: string) => {
    if (boardId && id && titleInput) {
      dispatch(
        updateTitleColumns({
          boardId,
          columnsId: id,
          column: { title: titleInput, order: order },
        })
      );
    }
  };

  const toggleTitle = () => {
    if (!titleEdit) {
      setTitleEdit(true);
    }
  };

  const handleClickAway = () => {
    if (titleEdit) {
      setTitleEdit(false);
    }
  };

  const handeleClickSub = () => {
    handleSubmit(titleInput);
    setTitleEdit(false);
  };

  const handleClickCancel = () => {
    setTitleEdit(false);
    setTitleInput(title);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };
  const handleDelete = () => {
    if (boardId) {
      dispatch(deleteColums({ boardId: boardId, columnId: id }));
    }
  };

  return (
    <>
      <ConfirmDialog
        title="Delete column?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      >
        <Typography>Are you sure you want to delete this column?</Typography>
      </ConfirmDialog>
      <Grid item xs={4}>
        <Paper
          sx={{
            minHeight: 300,
            minWidth: 200,
            maxWidth: 220,
            backgroundColor: '#1A2027',
            display: 'flex',
          }}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <Typography
              color="#FFFFFF"
              component="div"
              sx={{ padding: 0.8, width: 151, height: 40 }}
            >
              {!titleEdit ? (
                <Box onClick={toggleTitle} sx={{ cursor: 'pointer' }} color="#FFFFFF">
                  {title}
                </Box>
              ) : (
                <Paper variant="elevation" sx={{ display: 'flex', height: 30 }}>
                  <IconButton color="primary" size="small" onClick={handeleClickSub}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton color="primary" size="small" onClick={handleClickCancel}>
                    <CancelOutlinedIcon />
                  </IconButton>
                  <InputBase color="secondary" placeholder={title} onChange={handleOnChange} />
                </Paper>
              )}
            </Typography>
          </ClickAwayListener>
          <IconButton sx={{ height: 40 }} onClick={() => setConfirmOpen(true)}>
            <ClearIcon color="primary" height={25} />
          </IconButton>
        </Paper>
      </Grid>
    </>
  );
};
