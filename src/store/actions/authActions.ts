import { createAsyncThunk, GetThunkAPI } from "@reduxjs/toolkit";
import axios from "axios";
//import { setUser } from "../slices/authSlice";
import { IUserState } from "../slices/ISlices";

const base_url = process.env.REACT_APP_BASE_URL;

export const loginUser = createAsyncThunk<
  IUserState,
  { email: string; password: string }
>(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/getLoginDetails`, {
        params: credentials,
      });
      const user: IUserState = response.data[0];
      if (user) {
        // Convert the object to a JSON string
        const loggedInUser = {...user,status:"succeeded",isLoggedInWithGoogle:false, isLoggedInWithUserNamePassword: true}
        const userJson = JSON.stringify(loggedInUser);
        // Store the JSON string in local storage
        localStorage.setItem("user", userJson);
      } else {
        return thunkAPI.rejectWithValue({ message: "User not found" });
      }
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUserWithGoogle = createAsyncThunk<IUserState, string>(
  "auth/loginUserWithGoogle",
  async (accessToken, thunkAPI) => {
    try {
      const googleResponseData: IUserState = (
        await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      ).data;
      const loginResponse: IUserState = (
        await axios.get(`${base_url}/getLoginDetailsByEmail`, {
          params: { email: googleResponseData?.email },
        })
      ).data[0];
      const user: IUserState = { ...googleResponseData, ...loginResponse };
      if (user) {
        // Convert the object to a JSON string
        const loggedInUser = {...user,status:"succeeded",isLoggedInWithGoogle:true, isLoggedInWithUserNamePassword: false}
        const userJson = JSON.stringify(loggedInUser);
        // Store the JSON string in local storage
        localStorage.setItem("user", userJson);
      } else {
        return thunkAPI.rejectWithValue({ message: "User not found" });
      }
      return { ...googleResponseData, ...loginResponse };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
