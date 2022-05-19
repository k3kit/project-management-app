import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Action } from 'history';
import columnsService, { IColum } from '../../services/columns.service';
interface IColumns {
  boardId: string;
  columnsId: string;
  column: IColum;
}
// export const createColumns = createAsyncThunk(
//   'columns/add',
//   async ({ title, boardId }: IColumns, ThunkAPI) => {
//     try {
//       const response = await columnsService.createColumns(title, boardId);
//       return response.data;
//     } catch (error) {
//       ThunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const getColumns = createAsyncThunk('columns/all', async (boardId: string, ThunkAPI) => {
  try {
    const response = await columnsService.getAllColumns(boardId);
    console.log(response);
    return response;
  } catch (error) {
    ThunkAPI.rejectWithValue(error);
  }
});
export const updateTitleColumns = createAsyncThunk(
  'columns/update',
  async ({ boardId, columnsId, column }: IColumns, ThunkAPI) => {
    try {
      const response = await columnsService.updateColimns(boardId, columnsId, column);
      console.log(response.data);
      return response.data;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);
interface ICol {
  id: string;
  title: string;
  order: number;
}
interface state {
  columns: ICol[];
}
const initialState: state = { columns: [] };

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: {
    // [createColumns.fulfilled.type]: (state, action) => {
    //   state.column = action.payload;
    // },
    [getColumns.fulfilled.type]: (state, action) => {
      state.columns = action.payload.data;
    },
    [updateTitleColumns.fulfilled.type]: (state, action) => {
      const index = state.columns.findIndex((columns) => columns.id === action.payload.id);
      state.columns[index] = {
        ...state.columns,
        ...action.payload,
      };
    },
  },
});

export default columnsSlice.reducer;
