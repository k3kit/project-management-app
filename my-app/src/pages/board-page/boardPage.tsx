import { Box, Button, Container, Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { columnsSlice, getColumns } from '../../store/slices/columns';
import { BoardItem } from './boardItem';
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
          <Button variant="contained" sx={{ height: 50, width: 200, marginTop: 16 }}>
            add a column
          </Button>
        </Grid>
      </Box>
    </>
  );
};
export default BoardPage;
