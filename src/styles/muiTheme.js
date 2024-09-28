import { createTheme } from "@mui/material"

const drawerWidth = 240
export const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0397B5"
    },
    secondary: {
      main: "#f49833"
    }
  },
  typography: {},
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false
      }
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none"
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down("sm")]: {
            display: "none"
          },
          [theme.breakpoints.up("sm")]: {
            display: "block"
          }
        }),
        paper: {
          backgroundColor: "#0397B5",
          color: "white",
          boxSizing: "border-box",
          width: drawerWidth
        }
      }
    }
  }
})
