import React from "react";
import { Container, Box, Typography, Button, Link, Grid } from "@mui/material";
import { Form, useFormik, FormikProvider } from "formik";
import { InputField } from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "./validations";
import { loginInitialValues } from "./initialValues";
import { useAuthHandlerHook } from "../../hooks/useAuthHandlerHooks";
import ConfirmationDialog from "../../components/ConfirmationDialog";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { handleGoogleLogin, handleLogin, isLoginFailed, setIsLoginFailed } =
    useAuthHandlerHook();

  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: handleLogin,
  });

  return (
    <Container maxWidth="sm">
      <Box>
        <Grid container>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
          </Grid>
        </Grid>

        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={11} sm={11} md={11} lg={11}>
                <InputField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="new-email" // Use a unique value to prevent autofill
                  required
                />
              </Grid>
              <Grid item xs={11} sm={11} md={11} lg={11}>
                <InputField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={11} sm={11} md={11} lg={11}>
                <Button
                  variant="contained"
                  type="submit" // Set type to "submit" to handle form submission
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={11} sm={11} md={11} lg={11}>
                <Button
                  variant="outlined"
                  onClick={handleGoogleLogin}
                  fullWidth
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
        <Box mt={2}>
          <Link
            component="button"
            variant="body2"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </Link>
        </Box>
      </Box>
      <ConfirmationDialog
        size="md"
        open={isLoginFailed}
        showCloseIcon={true}
        onClose={() => setIsLoginFailed(false)}
        title="Login Failed"
        content="Login failed. Please check your email and password."
      />
    </Container>
  );
};

export default Login;
