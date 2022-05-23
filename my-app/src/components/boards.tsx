/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from './ConfirmationModal';
import { boardDelete, getBoards } from '../store/slices/boards';
import { useAppDispatch } from '../hooks/redux';
import { NavLink } from 'react-router-dom';

type MyProps = {
  title: string;
  id: string;
  setConfirmOpen: any;
  description: string;
};

export const Board: FC<MyProps> = ({ title, id, description }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(boardDelete(id));
  };

  return (
    <>
      <ConfirmDialog
        title="Delete board?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      >
        <Typography> Are you sure you want to delete this board?</Typography>
      </ConfirmDialog>

      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ width: 250, height: 150, display: 'flex', justifyContent: 'space-evenly' }}>
          <Box minHeight="100%" minWidth="50%">
            <NavLink to={`/board/${id}`}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5">{title}</Typography>
                </CardContent>
                <CardContent>
                  {/* <Typography variant="h5"></Typography> */}
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </NavLink>
          </Box>

          <CardActions>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setConfirmOpen(true)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};
