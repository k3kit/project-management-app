import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface CharacterState {
  onedEditProfile: boolean;
}

const initialState: CharacterState = {
  onedEditProfile: false,
};
export const ModalProfileSlice = createSlice({
  name: 'messageError',
  initialState,
  reducers: {
    setOpenEditProfile(state: { onedEditProfile: boolean }, action: PayloadAction<boolean>) {
      state.onedEditProfile = action.payload;
    },
  },
});

export default ModalProfileSlice.reducer;
