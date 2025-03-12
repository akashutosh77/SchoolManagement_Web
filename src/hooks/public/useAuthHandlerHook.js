import { useGoogleLogin } from "@react-oauth/google"
import CryptoJS from "crypto-js"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUser, loginUserWithGoogle, logoutUser } from "../../public/features/login/store/actions/authActions"
import { clearUser } from "../../public/features/login/store/slices/authSlice"
import { useState } from "react"

export const useAuthHandlerHook = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const secretKey = process.env.REACT_APP_SECRET_KEY || "default_secret_key" // Ensure to set this in your environment variables

  const hashPassword = (password, secret) => {
    return CryptoJS.HmacSHA256(password, secret).toString(CryptoJS.enc.Hex)
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        dispatch(loginUserWithGoogle(tokenResponse.access_token)).then(
          result => {
            if (result.meta.requestStatus === "fulfilled") {
              navigate("/private") // Redirect to the dashboard or another page
            } else {
              setIsLoginFailed(true)
            }
          }
        )
      } catch (error) {
        console.error("Error fetching Google user info:", error)
      }
    },
    onError: errorResponse => {
      console.error("Google login error", errorResponse)
    }
  })

  const handleGoogleLogin = () => {
    dispatch(logoutUser())
    googleLogin()
  }

  const handleLogin = async values => {
    try {
      const hashedPassword = hashPassword(values.password, secretKey)
      dispatch(logoutUser())
      dispatch(
        loginUser({ email: values.email, password: hashedPassword })
      ).then(result => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/private") // Redirect to the dashboard or another page
        } else {
          setIsLoginFailed(true)
        }
      })
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  return { handleGoogleLogin, handleLogin, isLoginFailed, setIsLoginFailed }
}
