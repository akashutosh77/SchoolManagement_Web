import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index"; // Ensure correct import path
import {getAttendanceDetails} from"../actions/attendanceActions";
import { IAttendanceProps} from "./ISlices";

const initialState: IAttendanceProps = {
    attendanceData:[],
    studentsData:[],
    status: "idle",
    error: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearAttendance: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttendanceDetails.pending, (state) => {
        return { ...state, status: "loading", error: null };
      })
      .addCase(getAttendanceDetails.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: "succeeded",
          error: null
        };
      })
      .addCase(getAttendanceDetails.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message || "Failed to login",
        };
      })
  },
});

export const { clearAttendance } = attendanceSlice.actions;

export const selectAttendanceData = (state: RootState) => state.attendance.attendanceData;
export const selectStudentData = (state: RootState)=> state.attendance.studentsData;

export default attendanceSlice.reducer;
