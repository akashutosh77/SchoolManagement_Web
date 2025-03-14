import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as XLSX from 'xlsx';
import { mapExcelToDbFormat, EXCEL_TO_DB_MAPPING, validateExcelData } from './utils';

const base_url = process.env.REACT_APP_BASE_URL;

export const uploadStudentBulkData = createAsyncThunk(
  "studentBulkUpload/uploadData",
  async (file, thunkAPI) => {
    try {
      // Read Excel file
      const reader = new FileReader();
      const excelData = await new Promise((resolve, reject) => {
        reader.onload = (e) => {
          try {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            resolve(jsonData);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
      });

      // Validate Excel data
      const validationErrors = validateExcelData(excelData);
      if (validationErrors.length > 0) {
        return thunkAPI.rejectWithValue({
          message: "Validation failed",
          errors: validationErrors
        });
      }
      
      // Map Excel data to DB format
      const mappedData = mapExcelToDbFormat(excelData, EXCEL_TO_DB_MAPPING);
      
      // Send to API
      const response = await axios.post(`${base_url}/student/bulk-upload`, mappedData, {
        headers: {
          'Content-Type': 'application/json'
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