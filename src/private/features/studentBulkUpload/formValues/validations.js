import * as Yup from 'yup';

const SUPPORTED_FORMATS = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'application/vnd.ms-excel', // .xls
  'application/x-excel', // Alternative MIME type for .xls
  'application/excel' // Alternative MIME type for Excel files
];

const SUPPORTED_EXTENSIONS = ['.xlsx', '.xls'];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const validationSchema = Yup.object().shape({
  file: Yup.mixed()
    .required('Please select an Excel file')
    .test('fileFormat', 'Unsupported file format. Please upload an Excel file (.xlsx or .xls)', 
      value => {
        if (!value) return false;
        
        // Check file extension
        const fileExtension = value.name.toLowerCase().slice(value.name.lastIndexOf('.')).trim();
        if (!SUPPORTED_EXTENSIONS.includes(fileExtension)) {
          return false;
        }

        // Check MIME type if available
        if (value.type) {
          return SUPPORTED_FORMATS.includes(value.type);
        }

        // If MIME type is not available, rely on extension check
        return true;
      })
    .test('fileSize', 'File size is too large. Maximum size is 5MB', 
      value => value && value.size <= MAX_FILE_SIZE)
}); 