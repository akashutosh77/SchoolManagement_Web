import React from "react"
import { Button } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { VisuallyHiddenInput } from "./Styles"

export const UploadButton = () => {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  )
}
