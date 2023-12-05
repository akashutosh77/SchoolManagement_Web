import React, { SyntheticEvent } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useField } from 'formik';
import { IReusableAutocompleteProps } from './IComponents';



const ReusableAutocomplete: React.FC<IReusableAutocompleteProps> = ({ label, name,value,options, ...rest }) => {
  const [field, meta] = useField(name);

  return (
    <Autocomplete
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

export default ReusableAutocomplete;
