import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

const user = JSON.parse(localStorage.getItem('user') || 'null');
const { addMessageError, addStatusText } = CharacterSlice.actions;
export const register = createAsyncThunk(
  '/signup',
  async ({ name, login, password }: userDataRegister, thunkAPI) => {
    try {
      const response = await authService.register(name, login, password);
      console.log(response.statusText);
      thunkAPI.dispatch(addStatusText(response.statusText));
      return response.data;
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
      thunkAPI.dispatch(addMessageError(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled.type]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected.type]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled.type]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected.type]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled.type]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
