import { IAttendanceProps } from "components/IComponents";
import MaterialReactTableField from "components/MaterialReactTableField";
import AttendanceHeader from "./attendanceHeader";
import { useState } from "react";
import { Idrpdown } from "ICommonUtils";
import { Divider } from "@mui/material";

const Attendance: React.FC = () => {
  const handleClassOnChange = (
    event: React.SyntheticEvent,
    newValue: Idrpdown | null
  ) => {
    alert('handle change is fired' + JSON.stringify(newValue))
  };
  return (
    <>
      <AttendanceHeader handleClassOnChange={handleClassOnChange} />
      <Divider sx={{mt:1}}></Divider>
    </>
  );
};
export default Attendance;
