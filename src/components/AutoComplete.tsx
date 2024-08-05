import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useField } from 'formik';
import { IReusableAutocompleteProps } from './IComponents';



const AutocompleteField: React.FC<IReusableAutocompleteProps> = ({ label, name,value,options,size, ...rest }) => {
  const [field, meta] = useField(name);

  return (
    <Autocomplete
      size={size}
      options={options}
      value={value}
      getOptionLabel={(option) => option.label}
      {...rest}
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          label={label}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          fullWidth
          variant="outlined"
        />
      )}
    
    />
  );
};

export default AutocompleteField;
