import React from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

export const DatePickerField = ({
  label,
  slotProps,
  style,
  value,
  format,
  ...rest
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...rest}
        sx={{ ...style }}
        slotProps={slotProps}
        label={label}
        value={value}
        format={format}
      />
    </LocalizationProvider>
  )
}
