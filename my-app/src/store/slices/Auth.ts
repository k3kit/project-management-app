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
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(addMessageError(message));
      return thunkAPI.rejectWithValue('error');
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
      thunkAPI.dispatch(addMessageError(message));
      return thunkAPI.rejectWithValue('error');
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
  isRegister: boolean;
  isLoading: boolean;
  error: string;
}
const initialState: IAuth = token
  ? {
      isLoggedIn: true,
      user: {} as IUser,
      token: '',
      isRegister: false,
      isLoading: false,
      error: '',
    }
  : {
      isLoggedIn: false,
      user: {} as IUser,
      token: 'null',
      isRegister: false,
      isLoading: false,
      error: '',
    };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoggedIn = false;
      state.user = action.payload;
      state.isRegister = true;
      state.isLoading = false;
    },
    [register.rejected.type]: (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.isRegister = false;
      state.error = action.payload;
    },
    [register.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [login.fulfilled.type]: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    [login.rejected.type]: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
      state.isLoading = false;
    },
    [login.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [logout.fulfilled.type]: (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
