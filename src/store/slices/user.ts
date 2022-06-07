import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userService from '../../services/user.service';
import { IFormEdit } from '../../types';

export const getUsers = createAsyncThunk('/usersAll', async (_, thunkAPI) => {
  try {
    const response = await userService.getAllUsers();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const deleteUsers = createAsyncThunk('/users/delete', async (id: string, thunkAPI) => {
  try {
    const response = await userService.deleteUser(id);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
interface IUpdateUser {
  id: string;
  user: IFormEdit;
}
export const updateUser = createAsyncThunk(
  '/users/update',
  async ({ id, user }: IUpdateUser, thunkAPI) => {
    try {
      const response = await userService.updateUser(id, user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('error');
    }
  }
);
export const getUserById = createAsyncThunk('/users/name', async (id: string, thunkAPI) => {
  try {
    const response = await userService.getUser(id);
    return response.data.name;
  } catch (error) {
    return thunkAPI.rejectWithValue('error');
  }
});
interface IUserData {
  id: string;
  name: string;
  login: string;
}
interface userState {
  users: IUserData[];
  error: string;
  userName: string;
}
const initialState: userState = { users: [], error: '', userName: '' };

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.fulfilled.type]: (state, action) => {
      state.users = action.payload;
    },
    [getUsers.rejected.type]: (state, action) => {
      state.error = action.payload;
    },
    [getUserById.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    [getUserById.rejected.type]: (state, action) => {
      state.error = action.payload;
    },
    [updateUser.fulfilled.type]: (state, action) => {},
    [updateUser.rejected.type]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;
