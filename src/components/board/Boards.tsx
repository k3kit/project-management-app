import React, { FC, useState, useCallback, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Fade,
  Grid,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../modal/ConfirmationModal';
import { boardDelete, getBoards } from '../../store/slices/boards';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type MyProps = {
  title: string;
  id: string;
  setConfirmOpen: boolean;
  description: string;
};

export const Board: FC<MyProps> = ({ title, id, description }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { fade } = useAppSelector((state) => state.boardReducer);
  const { t } = useTranslation();
  const handleDelete = () => {
    dispatch(boardDelete(id));
    dispatch(getBoards());
  };

  return (
    <>
      <ConfirmDialog
        title={t('board.confirm_title_delete')}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      >
        <Typography> {t('board.confirm')}</Typography>
      </ConfirmDialog>
      <Fade in={fade}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ width: 250, height: 150, display: 'flex', justifyContent: 'space-evenly' }}>
            <Box minHeight="100%" minWidth="50%">
              <NavLink to={`/board/${id}`}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h5">{title}</Typography>
                  </CardContent>
                  <CardContent>
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
                {t('board.delete')}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Fade>
    </>
  );
};
