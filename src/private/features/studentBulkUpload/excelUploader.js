import React from 'react';
import { 
  Button, 
  CircularProgress, 
  Box, 
  Typography, 
  Alert, 
  Grid, 
  Paper,
  Divider,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Form, FormikProvider } from 'formik';
import ConfirmationDialog from '../../../components/ConfirmationDialog';

const ExcelUploader = ({
  formik,
  uploadStatus,
  error,
  onDownloadTemplate,
  onFileChange,
  onCloseDialog
}) => {
  const renderError = () => {
    if (!error) return null;

    if (error.errors && Array.isArray(error.errors)) {
      return (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
          <Paper sx={{ p: 2, bgcolor: 'error.light' }}>
            <Typography variant="subtitle2" color="error" gutterBottom>
              Validation Errors:
            </Typography>
            <List dense>
              {error.errors.map((err, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={err}
                    sx={{ 
                      '& .MuiListItemText-primary': { 
                        color: 'error.main',
                        fontSize: '0.875rem'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      );
    }

    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error.message || 'An error occurred while uploading the file'}
      </Alert>
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12} sx={{ textAlign: "center", mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
                Student Bulk Upload
              </Typography>
              <Tooltip title="Upload multiple student records using an Excel file">
                <IconButton size="small">
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Upload student details in bulk using our Excel template (.xlsx or .xls)
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Error Display */}
          {renderError()}

          {/* Download Template Section */}
          <Grid item xs={12}>
            <Box sx={{ 
              p: 3, 
              bgcolor: 'grey.50', 
              borderRadius: 1,
              textAlign: 'center'
            }}>
              <Typography variant="subtitle2" gutterBottom>
                Step 1: Download the Excel Template
              </Typography>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={onDownloadTemplate}
                sx={{ mt: 1 }}
              >
                Download Template
              </Button>
            </Box>
          </Grid>

          {/* Upload Form */}
          <Grid item xs={12}>
            <Box sx={{ 
              p: 3, 
              bgcolor: 'grey.50', 
              borderRadius: 1,
              textAlign: 'center'
            }}>
              <Typography variant="subtitle2" gutterBottom>
                Step 2: Upload Filled Excel File
              </Typography>
              <FormikProvider value={formik}>
                <Form>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        accept=".xlsx,.xls"
                        style={{ display: 'none' }}
                        onChange={onFileChange}
                        onBlur={formik.handleBlur}
                      />
                      
                      <label htmlFor="file">
                        <Button
                          variant="contained"
                          component="span"
                          startIcon={uploadStatus === 'loading' ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                          disabled={uploadStatus === 'loading'}
                          color={formik.touched.file && formik.errors.file ? "error" : "primary"}
                          sx={{ 
                            minWidth: 200,
                            height: 48,
                            borderRadius: 2
                          }}
                        >
                          {formik.values.file ? formik.values.file.name : 'Choose Excel File'}
                        </Button>
                      </label>
                    </Grid>

                    {/* File Validation Error */}
                    {formik.touched.file && formik.errors.file && (
                      <Grid item xs={12}>
                        <Alert 
                          severity="error" 
                          icon={<ErrorOutlineIcon />}
                          sx={{ 
                            mt: 2,
                            '& .MuiAlert-message': { 
                              display: 'flex',
                              alignItems: 'center'
                            }
                          }}
                        >
                          {formik.errors.file}
                        </Alert>
                      </Grid>
                    )}

                    {/* Submit Button */}
                    {formik.values.file && !formik.errors.file && (
                      <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={uploadStatus === 'loading' || !formik.isValid}
                          startIcon={uploadStatus === 'loading' ? <CircularProgress size={20} /> : null}
                          sx={{ 
                            minWidth: 200,
                            height: 48,
                            borderRadius: 2
                          }}
                        >
                          {uploadStatus === 'loading' ? 'Uploading...' : 'Upload Students'}
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Form>
              </FormikProvider>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Success Dialog */}
      <ConfirmationDialog
        open={uploadStatus === 'succeeded'}
        title="Upload Successful"
        content={
          <Typography>
            File uploaded successfully! The student records have been added to the system.
          </Typography>
        }
        actions={[
          {
            label: 'OK',
            variant: 'contained',
            handler: onCloseDialog
          }
        ]}
        onClose={onCloseDialog}
        showCloseIcon={true}
        size="sm"
      />
    </Box>
  );
};

export default ExcelUploader; 