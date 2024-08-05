import { Typography } from "@mui/material";
import { ITeachersProps } from "components/IComponents";
import { teacherAttendance } from "utils";

//
const Teachers: React.FC<ITeachersProps> = ({ urlAfterPrivate }) => {
  return (
    <>
      {urlAfterPrivate == teacherAttendance && (
        <div>
          <Typography>Attendence is clicked</Typography>
        </div>
      )}
    </>
  );
};
export default Teachers;
