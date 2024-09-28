import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import * as React from "react"
import { attendanceByTeacher } from "utils"

const VerticalMenuTeachers = ({ handleMenuClick }) => {
  return (
    <List>
      <ListItem key={"Attendance"} disablePadding>
        <ListItemButton
          onClick={() => handleMenuClick(attendanceByTeacher)}
          sx={{ textAlign: "center" }}
        >
          <ListItemText primary={"Attendance"} />
        </ListItemButton>
      </ListItem>
    </List>
  )
}
export default VerticalMenuTeachers
