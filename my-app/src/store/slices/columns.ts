import { responsiveFontSizes } from '@mui/material';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { create } from 'domain';
import { title } from 'process';
import columnsService, { Icolumn, Task } from '../../services/columns.service';
import { IColumn, ICreateColumn, IUpdateColumns } from '../../types';
import { ITask } from './task';

export const createColumns = createAsyncThunk(
  'columns/add',
  async ({ boardId, column }: ICreateColumn, ThunkAPI) => {
    try {
      const response = await columnsService.createColumns(boardId, column);
      return response.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

export const getColumns = createAsyncThunk('columns/all', async (boardId: string, ThunkAPI) => {
  try {
    const response = await columnsService.getAllColumns(boardId);
    return response.data;
  } catch (error) {
    ThunkAPI.rejectWithValue(error);
  }
});

export const updateTitleColumns = createAsyncThunk(
  'columns/update',
  async ({ boardId, columnsId, column }: IUpdateColumns, ThunkAPI) => {
    try {
      const response = await columnsService.updateColums(boardId, columnsId, column);
      console.log(response.data);
      return response.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);
interface IcolumnDelete {
  boardId: string;
  columnId: string;
}
interface IcolumnDeletee {
  boardId: string;
  columnId: string;
}
export const deleteColums = createAsyncThunk(
  'columns/delete',
  async ({ boardId, columnId }: IcolumnDelete, ThunkAPI) => {
    try {
      await columnsService.deleteColumns(boardId, columnId);
      return columnId;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);
export const getColumnById = createAsyncThunk(
  'columns/id',
  async ({ boardId, columnId }: IcolumnDeletee, ThunkAPI) => {
    try {
      const respons = await columnsService.getColumnId(boardId, columnId);
      console.log(respons.data);
      return respons.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

interface TaskType {
  boardId: string;
  columnId: string;
  task: Task;
}
export const addTask = createAsyncThunk(
  'task/add',
  async ({ boardId, columnId, task }: TaskType, ThunkAPI) => {
    try {
      const respons = await columnsService.createTask(boardId, columnId, task);
      console.log(respons.data);
      return respons.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

// export interface IIIII {
//   id: string;
//   title: string;
//   order: number;
//   tasks: ITask[];
// }
interface ColumnState {
  columns: IColumn[];
  isLoading: boolean;
  dialog: boolean;
}

const initialState: ColumnState = { columns: [], isLoading: false, dialog: false };

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setOpen(state: { dialog: boolean }, action: PayloadAction<boolean>) {
      state.dialog = action.payload;
    },
  },
  extraReducers: {
    [createColumns.fulfilled.type]: (state, action) => {
      state.columns.push(action.payload);
    },
    [getColumns.fulfilled.type]: (state, action) => {
      state.columns = action.payload;
    },
    [updateTitleColumns.fulfilled.type]: (state, action) => {
      const index = state.columns.findIndex((columns) => columns.id === action.payload.id);
      state.columns[index].title = action.payload.title;
    },
    [deleteColums.fulfilled.type]: (state, action) => {
      state.columns = state.columns.filter((column) => column.id !== action.payload);
    },
    [getColumnById.fulfilled.type]: (state, action) => {
      const index = state.columns.findIndex((columns) => columns.id === action.payload.id);
      state.columns[index].tasks = action.payload.tasks;
      state.isLoading = false;
    },
    [getColumnById.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [addTask.fulfilled.type]: (state, action) => {
      const it = state.columns.find(({ id }) => id === action.payload.columnId);
      it?.tasks.push({
        id: action.payload.userId,
        title: action.payload.title,
        order: action.payload.order,
        description: action.payload.description,
        userId: action.payload.userId,
      });
    },
  },
});

export default columnsSlice.reducer;
