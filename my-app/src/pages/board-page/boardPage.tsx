import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../store/slices/boards';
import { columnsSlice, getColumns } from '../../store/slices/columns';
import { BoardItem } from './boardItem';
import { ButtonCreate } from './buttonCreate';
export interface Col {
  id: string;
  title: string;
  order: number;
}
const BoardPage = () => {
  const { boardId } = useParams();
  const dispath = useAppDispatch();

  const {} = columnsSlice.actions;
  const { columns } = useAppSelector((state) => state.columnsReducer);
  useEffect(() => {
    if (boardId) {
      dispath(getColumns(boardId));
    }
  }, [boardId, dispath]);

  return (
    <>
      <Header />
      <Box padding={2}>
        <Grid container spacing={{ xs: 2 }}>
          {columns &&
            columns.map((column: Col) => (
              <BoardItem key={column.id} id={column.id} title={column.title} order={column.order} />
            ))}
          <ButtonCreate />
        </Grid>
      </Box>
    </>
  );
};
export default BoardPage;
