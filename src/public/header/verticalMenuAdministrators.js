import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Typography } from "@mui/material";
import * as React from "react";
import { menuBulkUploadStudents } from "utils";

const VerticalMenuAdministrators = ({ handleMenuClick, openMenu }) => {
  return (
    <List>
      <ListItemButton onClick={() => handleMenuClick("Operations")}>
        <ListItemText primary="Operations" />
        {openMenu.Operations ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openMenu.Operations} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleMenuClick("menuBulkUploadStudents")}
          >
            <ListItemText primary="Bulk Upload Students" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Bulk Upload Students 2" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};
export default VerticalMenuAdministrators;
