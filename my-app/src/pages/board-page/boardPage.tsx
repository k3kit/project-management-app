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
      <Box width={2200} padding={2}>
        <Grid
          container
          spacing={{ xs: 2 }}
          sx={{
            gridAutoFlow: 'column',
            gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr)) !important',
            gridAutoColumns: 'minmax(160px, 1fr)',
          }}
        >
          {columns &&
            columns.map((column: Col) => (
              <BoardItem key={column.id} id={column.id} title={column.title} order={column.order} />
            ))}
        </Grid>
      </Box>
    </>
  );
};
export default BoardPage;
