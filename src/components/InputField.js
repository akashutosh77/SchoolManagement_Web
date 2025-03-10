import React from "react"
import { useField } from "formik"
import { at } from "lodash"
import { TextField } from "@mui/material"
import PropTypes from 'prop-types'

/**
 * InputField is a reusable form component that combines Formik's field handling
 * with Material-UI's TextField component. It automatically handles form validation
 * and error display.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the field (required for Formik)
 * @param {string} [props.label] - Label text for the input field
 * @param {string} [props.type='text'] - Input type (e.g., 'text', 'email', 'password')
 * @param {string} [props.helperText] - Helper text to display when there's no error
 * @returns {React.Component} A Material-UI TextField with Formik integration
 */
export const InputField = ({ errortext, ...props }) => {
  // Get field props and metadata from Formik
  const [field, meta] = useField(props.name)
  
  // Extract touched and error states using lodash's at() utility
  // This safely accesses nessted properties and handles undefined values
  const [touched, error] = at(meta, "touched", "error")
  
  // Determine if the field is in an error state
  // Only show error if the field has been touched and has an error message
  const isError = touched && error

  return (
    <TextField
      // Pass through the input type or default to 'text'
      type={props.type}
      // Show error styling if there's an error
      error={!!isError}
      // Show error message if there's an error, otherwise show helper text
      helperText={isError ? error : props.helperText}
      // Make the input full width by default
      fullWidth
      // Spread Formik field props (value, onChange, onBlur)
      {...field}
      // Spread remaining props (label, placeholder, etc.)
      {...props}
    />
  )
}

// PropTypes for development-time props validation
InputField.propTypes = {
  // name is required for Formik field binding
  name: PropTypes.string.isRequired,
  // Optional props with their expected types
  label: PropTypes.string,
  type: PropTypes.string,
  helperText: PropTypes.string,
}

// Default props for the component
InputField.defaultProps = {
  type: 'text', // Default to text input if type is not specified
}
