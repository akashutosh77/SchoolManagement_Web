import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUser } from '../slices/authSlice';

const base_url = process.env.REACT_APP_BASE_URL;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/getLoginDetails`, {params: credentials});
      const user = response.data[0];
      thunkAPI.dispatch(setUser(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUserWithGoogle = createAsyncThunk(
  'auth/loginUserWithGoogle',
  async (accessToken: string, thunkAPI) => {
    try {
      const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      thunkAPI.dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
