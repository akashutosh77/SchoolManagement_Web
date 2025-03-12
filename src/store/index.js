import { configureStore } from "@reduxjs/toolkit"
import attendanceReducer from "private/features/attendance/store/slices/attendenceSlice"
import authReducer from "public/features/login/store/slices/authSlice"
import masterDataReducer from "./slices/masterDataSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    masterData: masterDataReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== "production"
})

export default store
