import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// import absensiReducer from './slices/absensiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // absensi: absensiReducer,
  },
});

export default store;
