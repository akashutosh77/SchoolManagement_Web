import { createSlice } from "@reduxjs/toolkit"
import { loginUser, loginUserWithGoogle } from "../actions/authActions"


const initialState = {
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
  error: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload }
    },
    clearUser: () => {
      localStorage.clear();
      return initialState
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        return { ...state, status: "loading" }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isLoggedInWithUserNamePassword: true,
          status: "succeeded"
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message || "Failed to login"
        }
      })
      .addCase(loginUserWithGoogle.pending, state => {
        return { ...state, status: "loading" }
      })
      .addCase(loginUserWithGoogle.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isLoggedInWithGoogle: true,
          status: "succeeded"
        }
      })
      .addCase(loginUserWithGoogle.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message || "Failed to login"
        }
      })
  }
})

export const { setUser, clearUser } = authSlice.actions

export const selectUser = state => state.auth

export default authSlice.reducer
