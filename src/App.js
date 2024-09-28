import React, { useState } from "react"
import { Container, ThemeProvider } from "@mui/material"
import { muiTheme } from "./styles/muiTheme"
import { Background } from "./components/Background"
// import { Signup } from "./public/login/signup";
import AppRoutes from "./routes/appRoutes"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Header from "./public/header/header"

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const clientId = process.env.REACT_APP_CLIENT_ID ?? ""

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const result = await fetchData();
  //       setData(result);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   getData();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // } else {
  //   console.log("the data fetched is", data);
  // }
  return (
    <ThemeProvider theme={muiTheme}>
      <Background>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 10 }}>
          <GoogleOAuthProvider clientId={clientId}>
            <AppRoutes />
          </GoogleOAuthProvider>
        </Container>
      </Background>
    </ThemeProvider>
  )
}

export default App
