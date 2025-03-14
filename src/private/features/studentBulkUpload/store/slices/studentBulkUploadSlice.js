import { createSlice } from "@reduxjs/toolkit";
import { uploadStudentBulkData } from "../actions/studentBulkUploadActions";

const initialState = {
  uploadStatus: "idle",
  error: null,
  uploadedData: null
};

const studentBulkUploadSlice = createSlice({
  name: "studentBulkUpload",
  initialState,
  reducers: {
    clearUploadData: (state) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadStudentBulkData.pending, (state) => {
        state.uploadStatus = "loading";
        state.error = null;
      })
      .addCase(uploadStudentBulkData.fulfilled, (state, action) => {
        state.uploadStatus = "succeeded";
        state.uploadedData = action.payload;
        state.error = null;
      })
      .addCase(uploadStudentBulkData.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.error = action.payload || {
          message: "Failed to upload student data",
          errors: ["An unexpected error occurred"]
        };
      });
  }
});

export const { clearUploadData } = studentBulkUploadSlice.actions;
export const selectStudentBulkUpload = (state) => state.studentBulkUpload;
export default studentBulkUploadSlice.reducer; 