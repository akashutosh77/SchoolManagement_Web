import React from "react"
import { Button } from "@mui/material"
import { useGoogleLogin } from "@react-oauth/google"

const GoogleSignup = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
    onError: errorResponse => console.log(errorResponse)
  })

  const handleGoogleSignup = () => {
    googleLogin()
  }

  return (
    <Button variant="contained" onClick={handleGoogleSignup} fullWidth>
      Sign Up with Google
    </Button>
  )
}

export default GoogleSignup
