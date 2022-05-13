import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import userService from '../../services/user.service';
interface userData {
  name: string;
  login: string;
  password: string;
}
export const getUsers = createAsyncThunk('/users', async (_, thunkAPI) => {
  try {
    const data = await userService.getAllUsers();
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const deleteUsers = createAsyncThunk('/users', async (_, thunkAPI) => {
  try {
    const data = await userService.deleteUser('3a2380a3-dd37-4a5e-8f49-57821f262ee5');
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = { users: {}, error: '', user: {}, deleteUser: {} };

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
  },
});

export default usersSlice.reducer;
