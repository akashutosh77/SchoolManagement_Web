import { createSlice } from "@reduxjs/toolkit"
import { getAttendanceDetails } from "../actions/attendanceActions"

const initialState = {
  attendanceData: [],
  studentsData: [],
  status: "idle",
  error: null
}

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearAttendance: () => {
      return initialState
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAttendanceDetails.pending, state => {
        return { ...state, status: "loading", error: null }
      })
      .addCase(getAttendanceDetails.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: "succeeded",
          error: null
        }
      })
      .addCase(getAttendanceDetails.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message || "Failed to login"
        }
      })
  }
})

export const { clearAttendance } = attendanceSlice.actions
export const selectAttendance = state => state.attendance
export const selectAttendanceData = state => state.attendance.attendanceData
export const selectStudentData = state => state.attendance.studentsData

export default attendanceSlice.reducer
