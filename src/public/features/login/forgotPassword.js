import React from "react"
import { Container, Box, Typography, Button } from "@mui/material"
import { Formik, Form } from "formik"
import { InputField } from "components/InputField"
import { forgotPassword } from "services/loginService"
import { forgotPasswordInitialValues, forgotPasswordValidationSchema } from "public/features/login/formValues"

const ForgotPassword = () => {
  const handleForgotPassword = async values => {
    try {
      const response = await forgotPassword(values.email)
      console.log("Password reset link sent", response)
    } catch (error) {
      console.error("Error sending password reset link:", error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        <Formik
          initialValues={forgotPasswordInitialValues}
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={handleForgotPassword}
        >
          <Form>
            <InputField label="Email" name="email" type="email" required />
            <Button type="submit" variant="contained" fullWidth>
              Send Password Reset Link
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  )
}

export default ForgotPassword
