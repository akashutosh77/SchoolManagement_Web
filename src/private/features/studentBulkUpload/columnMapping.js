export const EXCEL_TO_DB_MAPPING = {
  "Student First Name": "firstName",
  "Student Middle Name": "middleName",
  "Student Last Name": "lastName",
  "Class Name": "className",
  "Section": "section",
  "Active": "isActive",
  "Admission Date": "admissionDate"
};

export const REQUIRED_FIELDS = [
  "Student First Name",
  "Student Last Name",
  "Class Name",
  "Section"
];

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