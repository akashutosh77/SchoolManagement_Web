import Attendance from "private/attendance/attendance"
import { urlOfTeacherAttendance } from "utils"

//
const Teachers = ({ urlAfterPrivate, userDetails, masterData }) => {
  return (
    <>
      {urlAfterPrivate == urlOfTeacherAttendance && (
        <Attendance masterData={masterData} />
      )}
    </>
  )
}
export default Teachers
