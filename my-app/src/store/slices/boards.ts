import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import boardsService from '../../services/boards.service';
interface boardType {
  id: string;
  title: string;
}
export const getBoards = createAsyncThunk('/boards', async (_, ThunkAPI) => {
  try {
    const response = await boardsService.getAllBoards();
    console.log(response.data);
    return response.data;
  } catch (error) {
    return ThunkAPI.rejectWithValue(error);
  }
});

export const addBoard = createAsyncThunk('/board/add', async (title: string, ThunkAPI) => {
  try {
    const response = await boardsService.createBoard(title);
    console.log(response);
    return response.data;
  } catch (error) {
    ThunkAPI.rejectWithValue(error);
  }
});
export const boardId = createAsyncThunk('/board/id', async (id: string, ThunkAPI) => {
  try {
    const response = await boardsService.boardById(id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    ThunkAPI.rejectWithValue(error);
  }
});
export const boardDelete = createAsyncThunk('/board/delete', async (id: string, ThunkAPI) => {
  try {
    const response = await boardsService.deleteBoard(id);
    console.log(response);
    return response;
  } catch (error) {
    ThunkAPI.rejectWithValue(error);
  }
});
export const updateBoard = createAsyncThunk(
  '/board/update',
  async ({ id, title }: boardType, ThunkAPI) => {
    try {
      const response = await boardsService.updateBoard(id, title);
      console.log(response);
      return response;
    } catch (error) {
      ThunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = { boards: {}, board: [] };
export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: {
    [getBoards.fulfilled.type]: (state, action) => {
      state.boards = action.payload.data;
    },
    [addBoard.fulfilled.type]: (state, action) => {
      state.board = action.payload.data;
    },
  },
});

export default boardsSlice.reducer;
