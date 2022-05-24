import React, { useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getColumns } from '../../store/slices/columns';
import { IColumn } from '../../types';
import { BoardItem } from './boardItem';
import { ButtonCreate } from './buttonCreate';

const BoardPage = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.columnsReducer);

  useEffect(() => {
    if (boardId) {
      dispatch(getColumns(boardId));
    }
  }, [boardId, dispatch]);

  return (
    <>
      <Header />
      <Box padding={2}>
        <Container>
          <Grid container spacing={{ xs: 2, height: '85vh' }}>
            {columns &&
              columns.map((column: IColumn) => (
                <BoardItem
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  order={column.order}
                  tasks={[]}
                />
              ))}
            <ButtonCreate />
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default BoardPage;
