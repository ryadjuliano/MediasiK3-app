import { createSlice } from '@reduxjs/toolkit';

const absensiSlice = createSlice({
  name: 'absensi',
  initialState: {
    lastAbsensi: null,
  },
  reducers: {
    setLastAbsensi: (state, action) => {
      state.lastAbsensi = action.payload;
    },
  },
});

export const { setLastAbsensi } = absensiSlice.actions;

export default absensiSlice.reducer;
