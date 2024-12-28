// Importing the Attendance component from the private attendance module
import Attendance from "private/attendance/attendance"

// Importing the URL constant for teacher attendance from the utils module
import { urlOfTeacherAttendance } from "utils"

// Define the Teachers functional component
const Teachers = ({ urlAfterPrivate, userDetails, masterData }) => {
  return (
    <>
      {/* Conditionally render the Attendance component if the URL matches urlOfTeacherAttendance */}
      {urlAfterPrivate == urlOfTeacherAttendance && (
        <Attendance masterData={masterData} />
      )}
    </>
  )
}

// Export the Teachers component as the default export
export default Teachers
