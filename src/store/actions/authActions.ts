import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUser } from '../slices/authSlice';

const base_url = process.env.REACT_APP_BASE_URL;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/getLoginDetails`, {params: credentials});
      const user = response.data[0];
      dispatch(setUser(user));
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
