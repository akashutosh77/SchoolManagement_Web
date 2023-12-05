import React from "react";
import { useField } from "formik";
import { IInputFieldProps } from "./IComponents";
import { at } from "lodash";
import { TextField } from "@mui/material";

export const InputField: React.FC<IInputFieldProps> = ({ ...rest }) => {
  const [field, meta] = useField(rest.name);
  const [touched, error] = at(meta, "touched", "error");
  //const isError = touched && error && true;

  const _renderHelperText = () => {
    if (touched && error) {
      return error;
    }
  };
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
  );
};
