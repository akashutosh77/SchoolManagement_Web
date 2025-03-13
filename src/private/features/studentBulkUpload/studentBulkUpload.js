import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './formValues';
import { uploadStudentBulkData } from './store/actions/studentBulkUploadActions';
import { selectStudentBulkUpload } from './store/slices/studentBulkUploadSlice';
import ExcelUploader from "./excelUploader";

const StudentBulkUpload = () => {
  const dispatch = useDispatch();
  const { uploadStatus, error } = useSelector(selectStudentBulkUpload);

  const handleSubmit = (values) => {
    dispatch(uploadStudentBulkData(values.file))
      .unwrap()
      .then(() => {
        formik.resetForm();
      })
      .catch(() => {
        // Error handling is done through the redux state
      });
  };

  const handleCloseDialog = () => {
    dispatch({ type: 'studentBulkUpload/resetStatus' });
  };

  const handleDownloadTemplate = () => {
    const templateUrl = process.env.PUBLIC_URL + '/templates/Student Details.xlsx';
    const link = document.createElement('a');
    link.href = templateUrl;
    link.setAttribute('download', 'Student Details.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleFileChange = (event) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      formik.setFieldValue('file', event.currentTarget.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  return (
    <ExcelUploader
      formik={formik}
      uploadStatus={uploadStatus}
      error={error}
      onDownloadTemplate={handleDownloadTemplate}
      onFileChange={handleFileChange}
      onCloseDialog={handleCloseDialog}
    />
  );
};

export default StudentBulkUpload;
