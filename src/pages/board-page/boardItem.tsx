import React, { FC, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  addTask,
  columnsSlice,
  deleteColums,
  getColumnById,
  getColumns,
} from '../../store/slices/columns';
import AddIcon from '@mui/icons-material/Add';
import Skeleton from '@mui/material/Skeleton';
import ClearIcon from '@mui/icons-material/Clear';
import { IColumn, ITask, Jwt } from '../../types';
import ConfirmDialog from '../../components/modal/ConfirmationModal';
import { ColumnTitle } from './columnTitle';
import { TaskItem } from './taskItem';
import { RootState } from '../../store/store';
import { Draggable, DraggableProvided, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { TaskCreate } from './taskCreate';
import { useTranslation } from 'react-i18next';

export const BoardItem: FC<IColumn> = ({ id, title, order, index }) => {
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const { isLoading, dialog, columns, fade } = useAppSelector((state) => state.columnsReducer);
  const { t } = useTranslation();

  useEffect(() => {
    if (boardId) {
      dispatch(getColumnById({ boardId: boardId, columnId: id }));
    }
  }, [boardId, dispatch, id, isLoading]);

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

  return (
    <>
      <ConfirmDialog
        title={t('board_page.confirm_title')}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      >
        <Typography>{t('board_page.confirm')}</Typography>
      </ConfirmDialog>
      <TaskCreate id={id} open={open} setOpen={setOpen} />
      <Draggable draggableId={id} index={index} key={id}>
        {(provided: DraggableProvided) => {
          return (
            // <Fade in={fade}>
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
                  width: '300px',
                  maxWidth: '300px',
                  minHeight: '250px',
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
                <Droppable droppableId={id} type="task">
                  {(provided: DroppableProvided) => (
                    <Box
                      className="box"
                      sx={{
                        flexDirection: 'column',
                        overflow: 'auto',
                        maxHeight: '50vh',
                        minHeight: '150px',
                        minWidth: '210px',
                      }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {isLoading ? (
                        tasks &&
                        [...tasks]
                          .sort((a, b) => a.order - b.order)
                          .map((it: ITask, index: number) => {
                            const keys = index + it.id;
                            return (
                              <TaskItem
                                key={keys}
                                id={it.id}
                                columnId={id}
                                title={it.title}
                                order={it.order}
                                description={it.description}
                                userId={it.userId}
                                index={index}
                              />
                            );
                          })
                      ) : (
                        <Skeleton variant="rectangular" width="100%" height="100%" />
                      )}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>

                <Box>
                  <Button startIcon={<AddIcon />} onClick={() => setOpen(true)} fullWidth>
                    {t('board_page.add_card')}
                  </Button>
                </Box>
              </Paper>
            </Grid>
            // </Fade>
          );
        }}
      </Draggable>
    </>
  );
};
