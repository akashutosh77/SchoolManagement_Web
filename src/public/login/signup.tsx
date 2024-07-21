import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField';
import { CustomButton } from '../../components/CustomButton';



const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});





export const Signup: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h5" gutterBottom>
          Registration Form
        </Typography>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <InputField
              label="Name"
              name="name"
              required
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              required
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              required
            />
            <CustomButton
             name="register"
              variant="contained"
              onClick={(e)=>{
                alert(e)
              }}
              fullWidth
            >
              Register
            </CustomButton>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};


