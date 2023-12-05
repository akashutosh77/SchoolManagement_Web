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

export const DatePickerField: React.FC<IDatePickerProps> = ({
  label,
  ...rest
}) => {
  const [field, meta, helper] = useField(rest.name);
  const { setValue } = helper;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
    }
  }, [value]);

  const _onChange = (
    value: Date | null ,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    if (value) {
      setSelectedDate(value);
      try {
        const ISODateString = value.toISOString();
        setValue(ISODateString);
      } catch (error) {
        setValue(value);
      }
    } else {
      setValue(value);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...field}
        {...rest}
        label={label}
        value={selectedDate}
        onChange={(value, context) => _onChange(value, context)}
      />
    </LocalizationProvider>
  );
};
