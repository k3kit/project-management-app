/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/redux';
import authHeader from '../../services/auth-header';
import authService from '../../services/auth.service';
import { CharacterSlice } from './Message';

interface userDataRegister {
  name: string;
  login: string;
  password: string;
}
interface userDataLogin {
  login: string;
  password: string;
}

const token = JSON.parse(localStorage.getItem('token') || 'null');
const { addMessageError, addStatusText } = CharacterSlice.actions;
export const register = createAsyncThunk(
  '/signup',
  async ({ name, login, password }: userDataRegister, thunkAPI) => {
    try {
      const data = await authService.register(name, login, password);
      thunkAPI.dispatch(addStatusText('registered'));
      console.log(data);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(addMessageError(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const login = createAsyncThunk(
  'auth/signin',
  async ({ login, password }: userDataLogin, thunkAPI) => {
    const { addMessageError } = CharacterSlice.actions;
    try {
      const data = await authService.login(login, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);

      thunkAPI.dispatch(addMessageError(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

interface IUser {
  id: string;
  login: string;
  name: string;
}
interface IAuth {
  isLoggedIn: boolean;
  user: IUser;
  token: string;
}
const initialState: IAuth = token
  ? { isLoggedIn: true, user: {} as IUser, token: '' }
  : { isLoggedIn: false, user: {} as IUser, token: 'null' };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoggedIn = false;
      state.user = action.payload;
    },
    [register.rejected.type]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled.type]: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    [login.rejected.type]: (state, action) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled.type]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
