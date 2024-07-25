import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { LoadingButton } from "@mui/lab";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { IDrawerAppBarProps } from "../../components/IComponents";
import VerticalMenuItems from "./verticalMenuItems";

const navItems = ["Home", "About", "Contact"];
const navItemsBeforeLogin = ["Login"];

const DrawerAppBar: React.FC<IDrawerAppBarProps> = ({
  window,
  handleDrawerToggle,
  mobileOpen,
  handleNavItemsBeforeLoginClick,
  handleSchoolNameClick,
  handleNavItemsBeforeLogoutClick,
  handleMenuClick,
  openMenu,
  handleTopMenuItemClick,
  ...rest
}) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ boxShadow: "none" }}>
        <Toolbar>
          {rest.isUserLoggedIn && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleSchoolNameClick}
          >
            School Name
          </Typography>

          <Box
            sx={{
              display: { xs: "none", sm: "block", md: "block", lg: "block" },
            }}
          >
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }} onClick={(e)=>handleTopMenuItemClick(e)}>
                {item}
              </Button>
            ))}
          </Box>
          <Box>
            {!rest.isUserLoggedIn ? (
              <LoadingButton
                loading={false}
                loadingPosition="start"
                startIcon={<LoginIcon />}
                variant="outlined"
                sx={{ color: "#fff" }}
                onClick={(e) =>
                  handleNavItemsBeforeLoginClick(
                    e.currentTarget.textContent || ""
                  )
                }
              >
                Login
              </LoadingButton>
            ) : (
              <LoadingButton
                loading={false}
                loadingPosition="start"
                startIcon={<LogoutIcon />}
                variant="outlined"
                sx={{ color: "white" }}
                onClick={() => handleNavItemsBeforeLogoutClick()}
              >
                Logout
              </LoadingButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          sx={{
            display: { xs: "block", sm: "block", md: "block", lg: "block" },
          }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <VerticalMenuItems
            handleMenuClick={handleMenuClick}
            openMenu={openMenu}
          />
        </Drawer>
      </nav>
    </Box>
  );
};
export default DrawerAppBar
