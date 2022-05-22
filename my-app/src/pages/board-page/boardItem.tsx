import React, { ChangeEvent, FC, useState, useEffect } from 'react';
import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteColums, updateTitleColumns } from '../../store/slices/columns';

import ClearIcon from '@mui/icons-material/Clear';
import { IColumn } from '../../types';
import ConfirmDialog from '../../components/ConfirmationModal';
import { getTasks, ITask } from '../../store/slices/task';
import { ColumnTitle } from './columnTitle';
import { TaskItem } from './taskItem';

export const BoardItem: FC<IColumn> = ({ id, title, order }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const { task } = useAppSelector((state) => state.taskReducer);
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
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <ColumnTitle id={id} title={title} order={order}></ColumnTitle>
            <IconButton sx={{ height: 40 }} onClick={() => setConfirmOpen(true)}>
              <ClearIcon color="primary" height={25} />
            </IconButton>
          </Box>
          <Box
            className="box"
            sx={{ flexDirection: 'column', overflow: 'auto', maxHeight: '50vh' }}
          >
            {task.map((it: ITask) => (
              <TaskItem
                key={it.id}
                id={it.id}
                title={it.title}
                order={it.order}
                done={it.done}
                description={it.description}
                userId={it.userId}
              />
            ))}
          </Box>
        </Paper>
      </Grid>
    </>
  );
};
