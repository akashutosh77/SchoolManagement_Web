export const urlAttendance = "attendance"
export const menuAttendance = "menuAttendance"
export const urlBulkUploadStudents = "bulkUploadStudents"
export const menuBulkUploadStudents = "menuBulkUploadStudents"

export const ROLES = {
  Super: "Super",
  Administrator: "Administrator",
  Teacher: "Teacher",
  Student: "Student",
  Parent: "Parent",
  Staff: "Staff"
}

/**
 * Convert a Date object to a string in the format "DD/MM/YYYY"
 * @param {Date} date - The date object to be converted
 * @returns {string} The formatted date string
 */
function formatDateToDDMMYYYY(date) {
  const day = ("0" + date.getDate()).slice(-2)
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Parse a date string and convert it to the format "DD/MM/YYYY"
 * @param {string} dateString - The date string to be parsed and converted
 * @returns {string} The formatted date string
 */
export function parseAndFormatDate(dateString) {
  const date = new Date(dateString)
  return formatDateToDDMMYYYY(date)
}

/**
 * Convert a boolean-like value to a true boolean
 * @param {any} value - The value to convert to boolean
 * @returns {boolean} The converted boolean value
 */
export const convertToBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  
  const strValue = String(value).toLowerCase().trim();
  return strValue === 'true' || strValue === '1' || strValue === 'yes';
};

/**
 * Convert Excel date serial number to JavaScript Date
 * @param {number} excelDate - Excel date serial number
 * @returns {Date} JavaScript Date object
 */
export const excelDateToJSDate = (excelDate) => {
  // Excel dates are stored as the number of days since January 1, 1900
  // Excel has a leap year bug where it thinks 1900 was a leap year, so we need to adjust
  // Only adjust if the date is after February 28, 1900 (day 59)
  let adjustedExcelDate = excelDate;
  if (excelDate > 59) {
    adjustedExcelDate -= 1; // Adjust for Excel's leap year bug
  }
  
  // Convert to milliseconds and create a new date
  // 25569 is the number of days between Excel's epoch (1/1/1900) and JavaScript's epoch (1/1/1970)
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return new Date((adjustedExcelDate - 25569) * millisecondsPerDay);
};
