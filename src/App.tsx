import React from "react";
import { UploadButton } from "./components/UploadButton";
import { ThemeProvider } from "@mui/material";
import { muiTheme } from "./styles/muiTheme";
import { Background } from "./components/Background";
import { DrawerAppBar } from "./components/DrawerAppBar";

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <Background>
        <DrawerAppBar />
        <div style={{ marginTop: "100px" }}>
          <UploadButton />
        </div>
      </Background>
    </ThemeProvider>
  );
}

export default App;
