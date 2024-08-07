import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useField } from 'formik';
import { IReusableAutocompleteProps } from './IComponents';



const AutocompleteField: React.FC<IReusableAutocompleteProps> = ({ label, name,options,size, ...rest }) => {
  const [field, meta] = useField(name);

  return (
    <Autocomplete
      size={size}
      options={options}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value)=>option.id==value.id}
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
          sx={{...rest.style}}
          variant="outlined"
        />
      )}
    
    />
  );
};

export default AutocompleteField;
