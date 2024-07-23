import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index'; // Ensure correct import path
import { loginUser } from '../actions/authActions';
import { IUserState } from './ISlices';



const initialState: IUserState = {
  userId: null,
  name: '',
  email: '',
  schoolId: null,
  roleId: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userId = action.payload.userId;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.schoolId = action.payload.schoolId;
        state.roleId = action.payload.roleId;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
