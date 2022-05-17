/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { FC, useState, useCallback } from 'react';
import ConfirmDialog from './ConfirmationModal';
import { boardDelete } from '../store/slices/boards';
import { useAppDispatch } from '../hooks/redux';
import { NavLink } from 'react-router-dom';

type MyProps = {
  title: string;
  id: string;
  setConfirmOpen: any;
};
export const Board: FC<MyProps> = ({ title, id }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispath = useAppDispatch();

  const handleDelete = useCallback(() => {
    dispath(boardDelete(id));
  }, [dispath, id]);
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

      <Grid item xs={2} sm={4} md={4}>
        <Card sx={{ width: 250, рeight: 150 }}>
          <NavLink to={`/board/${id}`}>
            <CardActionArea>
              <CardContent>
                <Typography variant="h5">{title}</Typography>
              </CardContent>
            </CardActionArea>
          </NavLink>
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