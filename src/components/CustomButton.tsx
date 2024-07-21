import React from "react";
import { ICustomButtonProps } from "./IComponents";
import { Button } from "@mui/material";
import { Styles } from "./Styles";

export const CustomButton: React.FC<ICustomButtonProps> = ({  
  children,
  variant,
  onClick,
  ...rest
}) => {
  return (
      <Button
        size={rest?.size || "small"}
        variant={variant}
        sx={{ ...Styles.customButton, ...rest.customStyle }}
        onClick={(e) => onClick(e)}
        fullWidth={rest?.fullWidth || false}
        disabled = {rest?.disabled || false}
        {...rest}
      >
        {children}
        </Button>
  );

};
