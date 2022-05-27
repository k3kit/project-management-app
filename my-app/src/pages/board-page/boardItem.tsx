import React, { FC, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addTask, columnsSlice, deleteColums, getColumnById } from '../../store/slices/columns';
import AddIcon from '@mui/icons-material/Add';
import Skeleton from '@mui/material/Skeleton';
import ClearIcon from '@mui/icons-material/Clear';
import { IColumn, ITask, Jwt } from '../../types';
import ConfirmDialog from '../../components/ConfirmationModal';
import { ColumnTitle } from './columnTitle';
import { TaskItem } from './taskItem';
import { RootState } from '../../store/store';
import { DragDropContext, Draggable, DraggableProvided } from 'react-beautiful-dnd';
import jwtDecode from 'jwt-decode';

export const BoardItem: FC<IColumn> = ({ id, title, order, index }) => {
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [descripInput, setDescripInput] = useState('');

  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  const { isLoading, dialog, columns } = useAppSelector((state) => state.columnsReducer);

  const getTasksByColumnId = (state: RootState, columnId: string) => {
    const currentColumn = state.columnsReducer.columns.find(
      (columns: { id: string }) => columns.id === columnId
    );
    if (currentColumn) {
      return currentColumn;
    }
    return [] as unknown as IColumn;
  };

  const { tasks } = useAppSelector((state) => getTasksByColumnId(state, id)) ?? [];

  const handleDelete = () => {
    if (boardId) {
      dispatch(deleteColums({ boardId: boardId, columnId: id }));
    }
  };

  const tokenA = JSON.parse(localStorage.getItem('token') || 'null');
  const tok = tokenA.token;
  const decoded = jwtDecode<Jwt>(tok);

  useEffect(() => {
    if (boardId) {
      dispatch(getColumnById({ boardId: boardId, columnId: id }));
    }
  }, [boardId, dispatch, id]);

  const addedTask = () => {
    if (boardId) {
      dispatch(
        addTask({
          boardId: boardId,
          columnsId: id,
          task: {
            title: titleInput,
            description: descripInput,
            userId: decoded.userId,
          },
        })
      );
    }
    setOpen(false);
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
            variant="standard"
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="description column"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDescripInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addedTask}>Create</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Draggable draggableId={id} index={index}>
        {(provided: DraggableProvided) => {
          return (
            <Grid
              item
              xs={4}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              id={id}
            >
              <Paper
                sx={{
                  minHeight: 200,
                  minWidth: 200,
                  maxWidth: 220,
                  backgroundColor: '#1A2027',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <ColumnTitle
                    id={id}
                    title={title}
                    order={order}
                    tasks={[]}
                    index={0}
                  ></ColumnTitle>
                  <IconButton sx={{ height: 40 }} onClick={() => setConfirmOpen(true)}>
                    <ClearIcon color="primary" height={25} />
                  </IconButton>
                </Box>
                <Box
                  className="box"
                  sx={{
                    flexDirection: 'column',
                    overflow: 'auto',
                    maxHeight: '50vh',
                    minHeight: '150px',
                    minWidth: '210px',
                  }}
                >
                  {!isLoading ? (
                    tasks &&
                    tasks.map((it: ITask, index: number) => {
                      const keys = index + it.id;
                      return (
                        <TaskItem
                          key={keys}
                          id={it.id}
                          title={it.title}
                          order={it.order}
                          description={it.description}
                          userId={it.userId}
                        />
                      );
                    })
                  ) : (
                    <Skeleton variant="rectangular" width={210} height={150} />
                  )}
                </Box>
                <Box>
                  <Button startIcon={<AddIcon />} onClick={() => setOpen(true)} fullWidth>
                    add card
                  </Button>
                </Box>
              </Paper>
            </Grid>
          );
        }}
      </Draggable>
    </>
  );
};
