import { convertToBoolean, excelDateToJSDate } from '../../../../../utils';


export const REQUIRED_FIELDS = [
    "Student First Name",
    "Student Last Name",
    "Class Name",
    "Section",
    "Active",
    "Admission Date"
  ];
/**
 * Map Excel data to database format using the provided mapping
 * @param {Array} excelData - Array of objects representing Excel data
 * @param {Object} mapping - Object mapping Excel field names to database field names
 * @returns {Array} Mapped data ready for database
 */
export const mapExcelToDbFormat = (excelData, mapping) => {
  return excelData.map(row => {
    const mappedRow = {};
    Object.entries(mapping).forEach(([excelField, dbField]) => {
      if (row[excelField] !== undefined && row[excelField] !== null) {
        const value = row[excelField];
        
        // Convert Active field to boolean
        if (excelField === "Active") {
          mappedRow[dbField] = convertToBoolean(value);
        }
        // Convert Admission Date to ISO string
        else if (excelField === "Admission Date") {
          let date;
          
          // Check if the value is a number (Excel serial date)
          if (typeof value === 'number') {
            date = excelDateToJSDate(value);
          } else {
            // Try to parse as a regular date string
            date = new Date(value);
          }
          
          // Check if date is valid
          if (!isNaN(date.getTime())) {
            mappedRow[dbField] = date.toISOString();
          } else {
            // If date is invalid, log error and use current date as fallback
            console.error(`Invalid date value: ${value}`);
            mappedRow[dbField] = new Date().toISOString();
          }
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

export const EXCEL_TO_DB_MAPPING = {
    "Student First Name": "firstName",
    "Student Middle Name": "middleName",
    "Student Last Name": "lastName",
    "Class Name": "className",
    "Section": "section",
    "Active": "isActive",
    "Admission Date": "admissionDate"
  };

  export const validateExcelData = (data) => {
    const errors = [];
    
    if (!Array.isArray(data) || data.length === 0) {
      errors.push("Excel file is empty or has invalid format");
      return errors;
    }
  
    // Check if all required columns exist
    const missingColumns = REQUIRED_FIELDS.filter(
      field => !data[0].hasOwnProperty(field)
    );
    
    if (missingColumns.length > 0) {
      errors.push(`Missing required columns: ${missingColumns.join(", ")}`);
      return errors;
    }
  
    // Validate each row
    data.forEach((row, index) => {
      // Check required fields are not empty
      REQUIRED_FIELDS.forEach(field => {
        const value = row[field];
        // Check if value is undefined, null, empty string, or just whitespace
        if (value === undefined || value === null || 
            (typeof value === 'string' && value.trim() === "") ||
            (typeof value !== 'string' && value.toString().trim() === "")) {
          errors.push(`Row ${index + 1}: ${field} is required`);
        }
      });
  
      // Validate Class Name and Section are strings and not too long
      if (row["Class Name"] && typeof row["Class Name"] === 'string' && row["Class Name"].length > 50) {
        errors.push(`Row ${index + 1}: Class Name must not exceed 50 characters`);
      }
      
      if (row["Section"] && typeof row["Section"] === 'string' && row["Section"].length > 20) {
        errors.push(`Row ${index + 1}: Section must not exceed 20 characters`);
      }
  
      // Validate Active field is boolean
      if (row["Active"] !== undefined && row["Active"] !== null) {
        const activeValue = row["Active"].toString().toLowerCase();
        if (activeValue !== "true" && activeValue !== "false" && 
            activeValue !== "1" && activeValue !== "0" && 
            activeValue !== "yes" && activeValue !== "no") {
          errors.push(`Row ${index + 1}: Active must be true/false, 1/0, or yes/no`);
        }
      }
  
      // Validate Admission Date format
      if (row["Admission Date"] !== undefined && row["Admission Date"] !== null) {
        const date = new Date(row["Admission Date"]);
        if (isNaN(date.getTime())) {
          errors.push(`Row ${index + 1}: Invalid Admission Date format`);
        }
      }
    });
  
    return errors;
  }; 
