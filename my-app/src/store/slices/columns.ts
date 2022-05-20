import { responsiveFontSizes } from '@mui/material';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { create } from 'domain';
import columnsService from '../../services/columns.service';
import { IColumn, ICreateColumn, IUpdateColumns } from '../../types';

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

interface ColumnState {
  columns: IColumn[];
}

const initialState: ColumnState = { columns: [] };

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
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
  },
});

export default columnsSlice.reducer;
