import { createSlice } from "@reduxjs/toolkit";
import { getMasterData } from "store/actions/masterDataActions";
import { RootState } from "../index"; // Ensure correct import path
import { IMasterDataProps } from "./ISlices";

const initialState: IMasterDataProps = {
  classesData: [],
  attendanceStatuses: [],
  status: "idle",
  error: null,
};

const masterDataSlice = createSlice({
  name: "masterData",
  initialState,
  reducers: {
    clearMasterData: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMasterData.pending, (state) => {
        return { ...state, status: "loading", error: null };
      })
      .addCase(getMasterData.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: "succeeded",
          error: null,
        };
      })
      .addCase(getMasterData.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message || "Failed to fetch master data",
        };
      });
  },
});

export const { clearMasterData } = masterDataSlice.actions;

export const selectClassesData = (state: RootState) =>
  state.masterData.classesData;
export const selectattendanceStatuses = (state: RootState) =>
  state.masterData.attendanceStatuses;
export const selectMasterData = (state: RootState) => state.masterData;

export default masterDataSlice.reducer;
