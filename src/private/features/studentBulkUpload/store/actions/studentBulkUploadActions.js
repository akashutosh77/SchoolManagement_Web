import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as XLSX from 'xlsx';
import { EXCEL_TO_DB_MAPPING, validateExcelData } from '../../columnMapping';

const base_url = process.env.REACT_APP_BASE_URL;

const convertToBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  
  const strValue = String(value).toLowerCase().trim();
  return strValue === 'true' || strValue === '1' || strValue === 'yes';
};

const mapExcelToDbFormat = (excelData) => {
  return excelData.map(row => {
    const mappedRow = {};
    Object.entries(EXCEL_TO_DB_MAPPING).forEach(([excelField, dbField]) => {
      if (row[excelField] !== undefined && row[excelField] !== null) {
        const value = row[excelField];
        
        // Convert Active field to boolean
        if (excelField === "Active") {
          mappedRow[dbField] = convertToBoolean(value);
        }
        // Convert Admission Date to ISO string
        else if (excelField === "Admission Date") {
          const date = new Date(value);
          mappedRow[dbField] = date.toISOString();
        }
        // Convert Class Id to number
        else if (excelField === "Class Id") {
          mappedRow[dbField] = Number(value);
        }
        // Convert string fields
        else {
          mappedRow[dbField] = String(value).trim();
        }
      }
    });
    return mappedRow;
  });
};

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
      const mappedData = mapExcelToDbFormat(excelData);
      
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