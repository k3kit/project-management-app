import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import userService from '../../services/user.service';

export const getUsers = createAsyncThunk('/users', async (_, thunkAPI) => {
  try {
    const response = await userService.getAllUsers();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const deleteUsers = createAsyncThunk('/users', async (id: string, thunkAPI) => {
  try {
    const response = await userService.deleteUser(id);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getUserById = createAsyncThunk('/users', async (id: string, thunkAPI) => {
  try {
    const response = await userService.getUser(id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
const initialState = { users: {}, error: '', user: '', deleteUser: {} };

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
    [getUserById.fulfilled.type]: (state, action) => {
      state.user = action.payload.name;
    },
  },
});

export default usersSlice.reducer;
