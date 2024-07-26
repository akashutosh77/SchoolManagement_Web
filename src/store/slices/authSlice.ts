import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index"; // Ensure correct import path
import { loginUser, loginUserWithGoogle } from "../actions/authActions";
import { IUserState } from "./ISlices";

const initialState: IUserState = {
  userId: null,
  name: "",
  email: "",
  schoolId: null,
  roleId: null,
  roleName: null,
  sub: null,
  given_name: null,
  family_name: null,
  picture: null,
  email_verified: false,
  isLoggedInWithGoogle: false,
  isLoggedInWithUserNamePassword: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<IUserState>) => {
    //   return { ...state, ...action.payload };
    // },
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('the action payload is',action);
        return {
          ...state,
          ...action.payload,
          isLoggedInWithUserNamePassword: true,
          status: "succeeded",
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message || "Failed to login",
        };
      })
      .addCase(loginUserWithGoogle.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(loginUserWithGoogle.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isLoggedInWithGoogle: true,
          status: "succeeded",
        };
      })
      .addCase(loginUserWithGoogle.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message || "Failed to login",
        };
      });
  },
});

export const {  clearUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
