import { createAsyncThunk, GetThunkAPI } from "@reduxjs/toolkit";
import axios from "axios";
//import { setUser } from "../slices/authSlice";
import { IUserState } from "../slices/ISlices";

const base_url = process.env.REACT_APP_BASE_URL;


/**
 * Thunk action for logging in a user.
 * 
 * This thunk sends a request to the backend API to authenticate the user with 
 * the provided email and password. Upon successful authentication, the user 
 * details are stored in local storage and returned. If authentication fails, 
 * an error is returned.
 * 
 * @param {Object} credentials - The user credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<IUserState>} - The authenticated user's state.
 */
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
      if(Object.keys(loginResponse).length==0){
        return thunkAPI.rejectWithValue({ message: "User not found" });
      }
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
