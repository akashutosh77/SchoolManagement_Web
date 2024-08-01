import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { IVerticalMenuItemsProps } from "../../components/IComponents";

const VerticalMenuItems: React.FC<IVerticalMenuItemsProps> = ({
  handleMenuClick,
  openMenu,
}) => {
  const navItems = ["Home", "About", "Contact"];
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton onClick={() => handleMenuClick("menu1")}>
          <ListItemText primary="Menu 1" />
          {openMenu.menu1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenu.menu1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Submenu 1-1" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Submenu 1-2" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => handleMenuClick("menu2")}>
          <ListItemText primary="Menu 2" />
          {openMenu.menu2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenu.menu2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Submenu 2-1" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Submenu 2-2" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => handleMenuClick("menu3")}>
          <ListItemText primary="Menu 3" />
          {openMenu.menu3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenu.menu3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Submenu 3-1" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Submenu 3-2" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => handleMenuClick("menu4")}>
          <ListItemText primary="Menu 4" />
          {openMenu.menu4 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenu.menu4} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Submenu 4-1" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Submenu 4-2" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};
export default VerticalMenuItems;
