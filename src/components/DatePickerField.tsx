import React, { useEffect, useState } from "react";
import { IDatePickerProps } from "./IComponents";
import { useField } from "formik";
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";

export const DatePickerField: React.FC<IDatePickerProps> = ({
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
        sx={{...style}}
        slotProps={slotProps}
        label={label}
        value={value}
        format={format}
      />
    </LocalizationProvider>
  );
};
