export let ROLES

;(function(ROLES) {
  ROLES["Super"] = "Super"
  ROLES["Administrator"] = "Administrator"
  ROLES["Teacher"] = "Teacher"
  ROLES["Student"] = "Student"
  ROLES["Parent"] = "Parent"
  ROLES["Staff"] = "Staff"
})(ROLES || (ROLES = {}))

export const urlOfTeacherAttendance = "attendance"
export const attendanceByTeacher = "attendanceByTeacher"

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
