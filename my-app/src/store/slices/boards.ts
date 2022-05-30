import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import boardsService from '../../services/boards.service';
import { boardType, IBoard } from '../../types';
import { CharacterSlice } from './Message';
const { addMessageError, addStatusText } = CharacterSlice.actions;
export const getBoards = createAsyncThunk('/boards', async (_, ThunkAPI) => {
  try {
    const response = await boardsService.getAllBoards();
    return response.data;
  } catch (error) {
    return ThunkAPI.rejectWithValue('Failed to load boards');
  }
});

export const addBoard = createAsyncThunk(
  '/board/add',
  async ({ title, description }: IBoard, ThunkAPI) => {
    try {
      const response = await boardsService.createBoard({ title, description });
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      ThunkAPI.dispatch(addMessageError(message));
      ThunkAPI.rejectWithValue(error);
    }
  }
);

export const boardId = createAsyncThunk('/board/id', async (id: string, ThunkAPI) => {
  try {
    const response = await boardsService.boardById(id);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    ThunkAPI.dispatch(addMessageError(message));
    ThunkAPI.rejectWithValue(error);
  }
});

export const boardDelete = createAsyncThunk('/board/delete', async (id: string, ThunkAPI) => {
  try {
    await boardsService.deleteBoard(id);
    return id;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    ThunkAPI.dispatch(addMessageError(message));
    ThunkAPI.rejectWithValue(error);
  }
});

export const updateBoard = createAsyncThunk(
  '/board/update',
  async ({ id, title }: boardType, ThunkAPI) => {
    try {
      const response = await boardsService.updateBoard(id, title);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      ThunkAPI.dispatch(addMessageError(message));
      ThunkAPI.rejectWithValue(error);
    }
  }
);

interface IBoards {
  id: string;
  title: string;
  description: string;
}

interface BoardsState {
  boards: IBoards[];
  Modal: boolean;
  error: string;
  isLoading: boolean;
  fade: boolean;
}

const initialState: BoardsState = {
  boards: [],
  Modal: false,
  error: '',
  isLoading: false,
  fade: false,
};

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
      state.fade = true;
    },
    [getBoards.pending.type]: (state) => {
      state.isLoading = true;
      state.fade = false;
    },
    [getBoards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addBoard.fulfilled.type]: (state, action: PayloadAction<IBoards>) => {
      state.boards.push(action.payload);
      state.fade = true;
    },
    [boardDelete.fulfilled.type]: (state, action) => {
      state.boards = state.boards.filter((boards) => boards.id !== action.payload);
    },
    [boardDelete.pending.type]: (state, action: PayloadAction<IBoards>) => {
      state.fade = false;
    },
  },
});

export default boardsSlice.reducer;
