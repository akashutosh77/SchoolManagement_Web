import React from "react";
import { Box } from "@mui/material";
import { IBackgroundProps } from "./IComponents";

export const Background: React.FC<IBackgroundProps> = ({ children, ...rest }) => {
  return (
    <Box
      sx={{
        backgroundImage: "url(/background.jpg)",
        backgroundSize: "cover", // Options: 'cover', 'contain', 'repeat', etc.
        backgroundPosition: "center",
        // width: "100vw",
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
};


