import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const base_url = process.env.REACT_APP_BASE_URL

export const getMasterData = createAsyncThunk(
  "masterData/getMasterData",
  async (parameters, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/getMasterData`, {
        params: parameters
      })
      const classesData = response.data[0]
      const attendanceStatuses = response.data[1]

      if (classesData?.length > 0 || attendanceStatuses?.length > 0) {
        return {
          classesData: classesData,
          attendanceStatuses: attendanceStatuses
        }
      } else {
        return thunkAPI.rejectWithValue({
          message: "Master Data not found"
        })
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
