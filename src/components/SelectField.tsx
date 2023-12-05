import { useField } from "formik";
import React from "react";
import { ISelectFieldProps } from "./IComponents";
import { at } from "lodash";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export const SelectField: React.FC<ISelectFieldProps> = ({ ...props }) => {
  const { label, data, onChange, ...rest } = props;
  const [field, meta] = useField(props.name);

  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  const _renderHelperText = () => {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  };
  return (
    <FormControl {...rest} error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        {...props}
        value={selectedValue ? selectedValue : ""}
        onChange={(e: SelectChangeEvent<HTMLSelectElement>, child: React.ReactNode) => onChange(e, child)}
    
      >
        {data.map((item, index) => (
          <MenuItem
            key={`${index}_${item.id}`}
            value={item.id}
            disabled={item?.disabled || false}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {_renderHelperText()}
    </FormControl>
  );
};
