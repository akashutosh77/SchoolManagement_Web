import { ITeachersProps } from "components/IComponents";
import Attendance from "private/attendance/attendance";
import { urlOfTeacherAttendance } from "utils";

//
const Teachers: React.FC<ITeachersProps> = ({
  urlAfterPrivate,
  userDetails,
  masterData,
}) => {
  return (
    <>
      {urlAfterPrivate == urlOfTeacherAttendance && (
        <Attendance masterData={masterData} />
      )}
    </>
  );
};
export default Teachers;
