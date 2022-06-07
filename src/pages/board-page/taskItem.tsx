import React, { FC, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Dialog,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { deepOrange } from '@mui/material/colors';
import EditTask from '../../components/task/editTask';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { getUsers } from '../../store/slices/user';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import ConfirmDialog from '../../components/modal/ConfirmationModal';
import { useParams } from 'react-router-dom';
import { deleteTask, getColumnById, getColumns } from '../../store/slices/columns';
interface MyProps {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  columnId: string;
  index: number;
}

export const TaskItem: FC<MyProps> = ({
  id,
  title,
  order,
  description,
  userId,
  columnId,
  index,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.userReducer);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { boardId } = useParams();

  useEffect(() => {
    dispatch(getUsers());
  }, [boardId, columnId, dispatch]);
  const handleDelete = async () => {
    if (boardId) {
      await dispatch(
        deleteTask({
          boardId: boardId,
          columnId: columnId,
          taskId: id,
        })
      );
    }

    if (boardId) {
      await dispatch(getColumnById({ boardId: boardId, columnId: columnId }));
    }
  };
  const userName = users.find((user) => user.id === userId)?.name;
  const userNameAvatar = userName?.substring(0, 1);
  return (
    <>
      <ConfirmDialog
        title="Delete task?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      >
        <Typography>Are you sure you want to delete this task?</Typography>
      </ConfirmDialog>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <EditTask
          titleIntup={title}
          descriptionInput={description}
          columnsId={columnId}
          id={id}
          title={title}
          order={order}
          description={description}
        />
      </Dialog>
      <Draggable draggableId={id} index={index}>
        {(provided: DraggableProvided) => {
          return (
            <Box {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
              <Accordion
                sx={{
                  bgcolor: '#383838',
                  margin: 1,
                  boxShadow: 'rgb(0 0 0 / 20%) 0px -1px 8px 0px;',
                  cursor: 'grabbing',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color="#ffffff">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List sx={{ color: '#ffffff' }}>
                    <ListItem>
                      <Paper
                        sx={{
                          width: '100%',
                          height: '20%',
                          padding: '5px',
                          bgcolor: '#1565c0',
                        }}
                      >
                        <Icon>
                          <DescriptionIcon />
                        </Icon>
                        <Typography color="#ffffff">{description}</Typography>
                      </Paper>
                    </ListItem>
                    <ListItem sx={{ justifyContent: 'space-between' }}>
                      <Button
                        variant="text"
                        endIcon={<EditIcon></EditIcon>}
                        onClick={() => setOpen(true)}
                      ></Button>
                      <Button
                        variant="text"
                        endIcon={<DeleteIcon></DeleteIcon>}
                        onClick={() => setConfirmOpen(true)}
                      ></Button>
                      <Button variant="text" startIcon={<PersonIcon />}>
                        {userName}
                      </Button>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        }}
      </Draggable>
    </>
  );
};
