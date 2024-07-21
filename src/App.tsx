import React, { useEffect, useState } from "react";
// import { UploadButton } from "./components/UploadButton";
import { Container, ThemeProvider } from "@mui/material";
import { muiTheme } from "./styles/muiTheme";
import { Background } from "./components/Background";
import { DrawerAppBar } from "./components/DrawerAppBar";
import { fetchData } from "./services/masterService";
// import { Signup } from "./public/login/signup";
import AppRoutes from "./routes/appRoutes";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    console.log("the data fetched is", data);
  }
  return (
    <ThemeProvider theme={muiTheme}>
      <Background>
        <DrawerAppBar />
        <div style={{ marginTop: "80px" }}>
          {/* <UploadButton /> */}
          {/* <Signup></Signup> */}
          <Container>
            <AppRoutes />
          </Container>
        </div>
      </Background>
    </ThemeProvider>
  );
}

export default App;
