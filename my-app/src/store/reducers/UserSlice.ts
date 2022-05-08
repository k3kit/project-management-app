import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
  name: '',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default UserSlice.reducer;
