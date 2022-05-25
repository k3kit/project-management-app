import React, { useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getColumnById, getColumns } from '../../store/slices/columns';
import { IColumn } from '../../types';
import { BoardItem } from './boardItem';
import { ButtonCreate } from './buttonCreate';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';

const BoardPage = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.columnsReducer);

  useEffect(() => {
    if (boardId) {
      dispatch(getColumns(boardId));
    }
  }, [boardId, dispatch]);
  const handleOnDragEnd = (result: DropResult) => {
    
    console.log(result);
  };
  return (
    <>
      <Header />
      <Box padding={2}>
        <Container>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="columns" direction="horizontal" type="column">
              {(provided: DroppableProvided) => (
                <Grid
                  container
                  spacing={{ xs: 2, height: '85vh' }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {columns.map((column: IColumn, index: number) => (
                    <BoardItem
                      key={column.id}
                      id={column.id}
                      title={column.title}
                      order={column.order}
                      tasks={[]}
                      index={index}
                    />
                  ))}
                  <ButtonCreate />
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Container>
      </Box>
    </>
  );
};
export default BoardPage;
