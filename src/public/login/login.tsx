import React from "react";
import { Container, Box, Typography, Button, Link, Grid } from "@mui/material";
import { Form, useFormik, FormikProvider } from "formik";
import { useGoogleLogin } from "@react-oauth/google";
import { InputField } from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "./validations";
import { loginInitialValues } from "./initialValues";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../../store/slices/authSlice";
import {
  loginUser,
  loginUserWithGoogle,
} from "../../store/actions/authActions";
import { AppDispatch } from "../../store";


const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      try {
        dispatch(loginUserWithGoogle(tokenResponse.access_token)).then(
          (result) => {
            console.log("the result is", result);
            if (result.meta.requestStatus === "fulfilled") {
              console.log("login is a success");
              navigate("/signup"); // Redirect to the dashboard or another page
            } else {
              alert("Login failed. Please check your email and password.");
            }
          }
        );
      } catch (error) {
        console.error("Error fetching Google user info:", error);
      }
    },
    onError: (errorResponse) => {
      console.error("Google login error", errorResponse);
    },
  });
  const handleGoogleLogin = () => {
    dispatch(clearUser());
    googleLogin();
  };
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      dispatch(clearUser());
      dispatch(loginUser(values)).then((result) => {
        console.log("the result is", result);
        if (result.meta.requestStatus === "fulfilled") {
          console.log("login is a success");
          navigate("/signup"); // Redirect to the dashboard or another page
        } else {
          alert("Login failed. Please check your email and password.");
        }
      });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };
  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      handleLogin(values);
    },
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
          <Form onSubmit={() => formik.handleSubmit()}>
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
          </Form>
        </FormikProvider>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <Button
              variant="contained"
              onClick={(e) => formik.handleSubmit()}
              fullWidth
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <Button variant="outlined" onClick={handleGoogleLogin} fullWidth>
              Login with Google
            </Button>
          </Grid>
        </Grid>
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
    </Container>
  );
};

export default Login;
