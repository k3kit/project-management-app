import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/redux';
import boardsService from '../../services/boards.service';
interface boardType {
  id: string;
  title: string;
}
export const getBoards = createAsyncThunk('/boards', async (_, ThunkAPI) => {
  try {
    const response = await boardsService.getAllBoards();
    return response.data;
  } catch (error) {
    return ThunkAPI.rejectWithValue('error');
  }
});

export const addBoard = createAsyncThunk('/board/add', async (title: string, ThunkAPI) => {
  try {
    const response = await boardsService.createBoard(title);
    return response.data;
  } catch (error) {
    ThunkAPI.rejectWithValue(error);
  }
});
export const boardId = createAsyncThunk('/board/id', async (id: string, ThunkAPI) => {
  try {
    const response = await boardsService.boardById(id);
    return response.data;
  } catch (error) {
    ThunkAPI.rejectWithValue(error);
  }
});
export const boardDelete = createAsyncThunk('/board/delete', async (id: string, ThunkAPI) => {
  try {
    const response = await boardsService.deleteBoard(id);
    return response.data;
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
interface IBoards {
  id: string;
  title: string;
}

interface BoardsState {
  boards: IBoards[];
  Modal: boolean;
  error: string;
  isLoading: boolean;
}

const initialState: BoardsState = { boards: [], Modal: false, error: '', isLoading: false };
export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setOpen(state: { Modal: boolean }, action: PayloadAction<boolean>) {
      state.Modal = action.payload;
    },
  },
  extraReducers: {
    [getBoards.fulfilled.type]: (state, action: PayloadAction<IBoards[]>) => {
      state.boards = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    [getBoards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getBoards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addBoard.fulfilled.type]: (state, action: PayloadAction<IBoards>) => {
      state.boards.push(action.payload);
    },
    [boardDelete.fulfilled.type]: (state, action: PayloadAction<IBoards>) => {
      const index = state.boards.findIndex(({ id }) => id === action.payload.id);
      state.boards.splice(index, 1);
    },
  },
});

export default boardsSlice.reducer;
