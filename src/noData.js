import React from "react"
import { Box, Typography } from "@mui/material"

const NoData = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center"
      padding={3}
      bgcolor="white"
      borderRadius="8px"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#bdbdbd"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" stroke="#bdbdbd" />
        <line x1="12" y1="8" x2="12" y2="12" stroke="#bdbdbd" />
        <line x1="12" y1="16" x2="12" y2="16" stroke="#bdbdbd" />
      </svg>
      <Typography variant="h6" sx={{ mt: 2, color: "#757575" }}>
        No Data Available
      </Typography>
    </Box>
  )
}

export default NoData
