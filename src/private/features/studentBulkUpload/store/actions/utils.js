import { convertToBoolean, excelDateToJSDate } from '../../../../../utils';

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
