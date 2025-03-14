import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { validationSchema, initialValues } from './formValues';
import { uploadStudentBulkData } from './store/actions/studentBulkUploadActions';
import { selectStudentBulkUpload, clearUploadData } from './store/slices/studentBulkUploadSlice';
import ExcelUploader from "./excelUploader";

const StudentBulkUpload = () => {
  const dispatch = useDispatch();
  const { uploadStatus, error } = useSelector(selectStudentBulkUpload);

  const handleSubmit = (values) => {
    dispatch(uploadStudentBulkData(values.file))
      .unwrap()
      .then(() => {
        formik.resetForm();
        // Reset file input
        const fileInput = document.getElementById('file');
        if (fileInput) {
          fileInput.value = '';
        }
      })
      .catch(() => {
        // Error handling is done through the redux state
      });
  };

  const handleCloseDialog = () => {
    dispatch(clearUploadData());
    formik.resetForm();
    // Reset file input
    const fileInput = document.getElementById('file');
    if (fileInput) {
      fileInput.value = '';
    }
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

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    await formik.setFieldValue('file', file);
    // Validate the file immediately
    if (file) {
      await formik.validateField('file');
      formik.setFieldTouched('file', true, false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: true
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
