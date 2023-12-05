import { Box, CircularProgress, Fade } from "@mui/material";
import React from "react";
import { Styles } from "./Styles";
import { ICircularLoaderProps } from "./IComponents";


export const CircularLoader: React.FC<ICircularLoaderProps> = ({
  loading,
  children,
  ...rest
}) => {
  return (
    <Box sx={Styles.root}>
      {children}
      <Fade in={loading} unmountOnExit>
        <Box sx={Styles.loader}>
          <CircularProgress color="primary" />
        </Box>
      </Fade>
    </Box>
  );
};
