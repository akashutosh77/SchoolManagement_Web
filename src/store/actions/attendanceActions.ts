import { createAsyncThunk, GetThunkAPI } from "@reduxjs/toolkit";
import axios from "axios";
//import { setUser } from "../slices/authSlice";
import { IUserState } from "../slices/ISlices";
import { IAttendanceProps } from "../slices/ISlices";

const base_url = process.env.REACT_APP_BASE_URL;

export const getAttendanceDetails = createAsyncThunk<
  IAttendanceProps,
  { schoolId: number; classId: number; attendanceDate?: Date }
>(
  "attendance/getAttendanceDetails",
  async (
    parameters: { schoolId: number; classId: number; attendanceDate?: Date },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(`${base_url}/getAttendanceDetails`, {
        params: parameters,
      });
      const attendanceData = response.data[0];
      const studentsData = response.data[1];
      if (attendanceData?.length > 0 || studentsData?.length > 0) {
        return { attendanceData: attendanceData, studentsData: studentsData };
      } else {
        return thunkAPI.rejectWithValue({
          message: "Attendance details not found",
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
