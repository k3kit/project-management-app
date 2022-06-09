import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface CharacterState {
  error: string;
  statusText: string;
}

const initialState: CharacterState = {
  error: '',
  statusText: '',
};
export const CharacterSlice = createSlice({
  name: 'messageError',
  initialState,
  reducers: {
    addMessageError(state: { error: string }, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    addStatusText(state: { statusText: string }, action: PayloadAction<string>) {
      state.statusText = action.payload;
    },
  },
});

export default CharacterSlice.reducer;
