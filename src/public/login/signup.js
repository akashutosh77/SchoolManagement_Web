import React, { useState } from "react"
import { Container, Box, Typography, Button } from "@mui/material"
import GoogleSignup from "./googleSignup"
import EmailPasswordSignup from "./emailPasswordSignup"
import { selectUser } from "../../store/slices/authSlice"
import { useSelector } from "react-redux"

const Signup = () => {
  const [useGoogle, setUseGoogle] = useState(false)
  const loggedInUser = useSelector(selectUser)

  console.log("the logged in user is", loggedInUser)
  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h5" gutterBottom>
          Registration Form
        </Typography>
        <Box mb={2}>
          <Button
            variant="contained"
            onClick={() => setUseGoogle(false)}
            fullWidth
          >
            Register with Email and Password
          </Button>
          <Button
            variant="outlined"
            onClick={() => setUseGoogle(true)}
            fullWidth
          >
            Register with Google
          </Button>
        </Box>
        {useGoogle ? <GoogleSignup /> : <EmailPasswordSignup />}
      </Box>
    </Container>
  )
}

export default Signup
