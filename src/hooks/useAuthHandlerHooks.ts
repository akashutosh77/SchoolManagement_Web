import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../store/slices/authSlice";
import { loginUser, loginUserWithGoogle } from "../store/actions/authActions";
import { AppDispatch } from "../store";

export const useAuthHandlerHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        dispatch(loginUserWithGoogle(tokenResponse.access_token)).then(
          (result) => {
            if (result.meta.requestStatus === "fulfilled") {
              navigate("/private"); // Redirect to the dashboard or another page
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
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/private"); // Redirect to the dashboard or another page
        } else {
          alert("Login failed. Please check your email and password.");
        }
      });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return { handleGoogleLogin, handleLogin };
};
