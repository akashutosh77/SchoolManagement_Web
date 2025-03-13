import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

export const uploadStudentBulkData = createAsyncThunk(
  "studentBulkUpload/uploadData",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(`${base_url}/uploadStudentBulkData`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue({
          message: "Failed to upload student data"
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
); 