import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useField } from 'formik';

const AutocompleteField = ({ label, name, options, size, ...rest }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <Autocomplete
      size={size}
      value={field.value || null}
      options={options}
      disableClearable
      getOptionLabel={(option) => option}
      isOptionEqualToValue={(option, value) => option == value}
      {...rest}
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          name={name}
          label={label}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          fullWidth
          sx={{ ...rest.style }}
          variant="outlined"
        />
      )}
    />
  );
};

export default AutocompleteField;

