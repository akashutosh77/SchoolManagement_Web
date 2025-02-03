import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

export const getAttendanceDetails = createAsyncThunk(
  "attendance/getAttendanceDetails",
  async (parameters, thunkAPI) => {
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

export const insertOrUpdateAttendanceDetails = createAsyncThunk(
  "attendance/insertOrUpdateAttendanceDetails",
  async (attendanceRecords, thunkAPI) => {
    try {
      const response = await axios.post(
        `${base_url}/insertOrUpdateAttendanceDetails`,
        { attendanceRecords } // Sending data as request body
      );

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue({
          message: "Failed to insert/update attendance details",
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
