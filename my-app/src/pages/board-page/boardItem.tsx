import React, { ChangeEvent, FC, useState, useEffect } from 'react';
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

import ClearIcon from '@mui/icons-material/Clear';
import { IColumn } from '../../types';
import ConfirmDialog from '../../components/ConfirmationModal';
import { getTasks } from '../../store/slices/task';
import { ColumnTitle } from './columnTitle';

export const BoardItem: FC<IColumn> = ({ id, title, order }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  useEffect(() => {
    if (boardId) {
      dispatch(getTasks({ IdBoard: boardId, IdColumn: id }));
    }
  }, [boardId, dispatch, id]);

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
          <ColumnTitle id={id} title={title} order={order}></ColumnTitle>
          <IconButton sx={{ height: 40 }} onClick={() => setConfirmOpen(true)}>
            <ClearIcon color="primary" height={25} />
          </IconButton>
        </Paper>
      </Grid>
    </>
  );
};
