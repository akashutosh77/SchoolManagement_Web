import React from "react"
import { useField } from "formik"
import { at } from "lodash"
import { TextField } from "@mui/material"

export const InputField = ({ ...rest }) => {
  const [field, meta] = useField(rest.name)
  const [touched, error] = at(meta, "touched", "error")
  //const isError = touched && error && true;

  const _renderHelperText = () => {
    if (touched && error) {
      return error
    }
  }
  return (
    <TextField
      type={rest.type}
      error={
        meta.touched && meta.error !== "" && meta.error !== undefined && true
      }
      helperText={_renderHelperText()}
      {...field}
      {...rest}
    />
  )
}
