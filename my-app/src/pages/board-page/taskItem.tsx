import React, { FC, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardId } from '../../store/slices/boards';
import { useParams } from 'react-router-dom';
import { ITask } from '../../types';
import { getUserById } from '../../store/slices/user';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { deepOrange } from '@mui/material/colors';

export const TaskItem: FC<ITask> = ({ id, title, order, description, userId }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(getUserById(userId));
  });

  return (
    <>
      <Box>
        <Accordion
          sx={{
            bgcolor: '#383838',
            margin: 2,
            boxShadow: 'rgb(0 0 0 / 20%) 0px -1px 8px 0px;',
            cursor: 'grabbing',
            padding: '5px',
            m: '5px',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color="#ffffff">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ color: '#ffffff' }}>
              <ListItem>
                <Typography color="#ffffff">Description: {description}</Typography>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Delete" sx={{ color: '#ffffff' }} />
                  <ListItemIcon>
                    <DeleteIcon color="primary" />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>

              {/* <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItemButton>
              </ListItem> */}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};
