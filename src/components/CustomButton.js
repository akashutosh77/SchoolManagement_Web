import React from "react";
import { Button } from "@mui/material";
import { Styles } from "./Styles";

export const CustomButton = ({
  children,
  variant,
  onClick,
  ...rest
}) => {
  return (
    <Button
      size={rest.size || "small"}
      variant={variant}
      sx={{ ...Styles.customButton, ...rest.customStyle }}
      onClick={onClick}
      fullWidth={rest.fullWidth || false}
      disabled={rest.disabled || false}
      {...rest}
    >
      {children}
    </Button>
  );
};

