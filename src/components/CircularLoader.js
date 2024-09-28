import React from "react";
import { Box, CircularProgress, Fade } from "@mui/material";
import { Styles } from "./Styles";

export const CircularLoader = ({ loading, children, ...rest }) => {
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

