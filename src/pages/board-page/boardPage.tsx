import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  columnsSlice,
  getColumns,
  TaskType,
  updateTask,
  updateTitleColumns,
} from '../../store/slices/columns';
import { IColumn, ITask, ITaskType, ITaskTypeDrag, ITaskTypeUpdate, Jwt } from '../../types';
import { BoardItem } from './boardItem';
import { ButtonCreate } from './buttonCreate';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { getUsers } from '../../store/slices/user';
import jwtDecode from 'jwt-decode';

const BoardPage = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.columnsReducer);
  const { orderColumn, orderTask } = columnsSlice.actions;
  const tokenA = JSON.parse(localStorage.getItem('token') || 'null');
  const tok = tokenA.token;
  const decoded = jwtDecode<Jwt>(tok);

  useEffect(() => {
    if (boardId) {
      dispatch(getColumns(boardId));
    }
  }, [boardId, dispatch]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    const newColumnOrder = [...columns];
    const spliceColumn = newColumnOrder.splice(source.index, 1) as IColumn[];
    newColumnOrder.splice(destination.index, 0, ...spliceColumn);
    if (type === 'column') {
      const it = newColumnOrder.map((column, index) => {
        return { ...column, order: index + 1 };
      });
      for (let i = 0; i < it.length; i++) {
        if (boardId) {
          dispatch(
            updateTitleColumns({
              boardId,
              columnsId: it[i].id,
              column: { title: it[i].title, order: it[i].order },
            })
          );
        }
      }
      dispatch(orderColumn(it));
    }
    if (type === 'task') {
      const columnStart = columns.filter((item) => item.id == source.droppableId);
      const columnFinish = columns.filter((item) => item.id == destination.droppableId);
      if (JSON.stringify(columnStart) === JSON.stringify(columnFinish)) {
        const newTasksById = [...columnStart[0].tasks];
        const spliceTask = newTasksById.splice(source.index, 1) as TaskType[];
        newTasksById.splice(destination.index, 0, ...spliceTask);
        const a = newTasksById.map((task, index) => {
          return { ...task, order: index + 1 };
        });
        for (let i = 0; i < a.length; i++) {
          if (boardId) {
            dispatch(
              updateTask({
                boardId: boardId,
                columnsId: columnStart[0].id,
                taskId: a[i].id,
                task: {
                  title: a[i].title,
                  order: a[i].order,
                  description: a[i].description,
                  userId: decoded.userId,
                  boardId: boardId,
                  columnId: columnStart[0].id,
                },
              })
            );
          }
        }
        dispatch(
          orderTask({
            columnId: columnStart[0].id,
            tasks: a,
          })
        );
        return;
      }

      const startTaskById = [...columnStart[0].tasks];
      const spliceTask = startTaskById.splice(source.index, 1) as TaskType[];
      for (let i = 0; i < startTaskById.length; i++) {
        if (boardId) {
          dispatch(
            updateTask({
              boardId: boardId,
              columnsId: columnStart[0].id,
              taskId: startTaskById[i].id,
              task: {
                title: startTaskById[i].title,
                order: startTaskById[i].order,
                description: startTaskById[i].description,
                userId: decoded.userId,
                boardId: boardId,
                columnId: columnStart[0].id,
              },
            })
          );
        }
      }
      dispatch(
        orderTask({
          columnId: columnStart[0].id,
          tasks: startTaskById,
        })
      );
      const finishTaskById = [...columnFinish[0].tasks];
      finishTaskById.splice(destination.index, 0, ...spliceTask);
      const a = finishTaskById.map((task, index) => {
        return { ...task, order: index + 1 };
      });
      for (let i = 0; i < a.length; i++) {
        if (boardId) {
          dispatch(
            updateTask({
              boardId: boardId,
              columnsId: columnStart[0].id,
              taskId: a[i].id,
              task: {
                title: a[i].title,
                order: a[i].order,
                description: a[i].description,
                userId: decoded.userId,
                boardId: boardId,
                columnId: columnFinish[0].id,
              },
            })
          );
        }
      }
      dispatch(
        orderTask({
          columnId: columnFinish[0].id,
          tasks: a,
        })
      );
    }
  };

  return (
    <>
      {/* <Header /> */}
      <Box padding={2} sx={{ height: '72.5vh', overflow: 'auto ' }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided: DroppableProvided) => (
              <Stack
                direction="row"
                spacing={3}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {[...columns]
                  .sort((a, b) => a.order - b.order)
                  .map((column: IColumn, index: number) => (
                    <BoardItem
                      key={column.id}
                      id={column.id}
                      title={column.title}
                      order={column.order}
                      tasks={[]}
                      index={index}
                    />
                  ))}
                {provided.placeholder}
                <ButtonCreate />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </>
  );
};
export default BoardPage;
