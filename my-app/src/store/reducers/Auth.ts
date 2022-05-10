import { createSlice } from '@reduxjs/toolkit';

export interface TypeUserData {
  name: string;
  id: string;
  login: string;
}
interface AuthState {
  userData: TypeUserData;
  token: string;
}
const initialState: AuthState = {
  userData: {} as TypeUserData,
  token: '',
};
export const UserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default UserSlice.reducer;
