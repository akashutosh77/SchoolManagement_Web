import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  file: Yup.mixed()
    .required('Please select a file')
    .test('fileFormat', 'Unsupported file format', (value) => {
      if (!value) return true; // Let required handle empty
      return ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(value.type);
    })
}); 