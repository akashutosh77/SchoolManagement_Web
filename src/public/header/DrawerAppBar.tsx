import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IDrawerAppBarProps } from "../../components/IComponents";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import VerticalMenuItems from "./verticalMenuItems";

const navItems = ["Home", "About", "Contact"];
const navItemsBeforeLogin = ["Login"];

export const DrawerAppBar: React.FC<IDrawerAppBarProps> = ({
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
