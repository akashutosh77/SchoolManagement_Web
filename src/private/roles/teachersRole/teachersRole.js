// Importing the Attendance component from the private attendance module
import Attendance from "private/features/attendance/attendance"

// Importing the URL constant for teacher attendance from the utils module
import { urlAttendance } from "utils"

// Define the Teachers functional component
const TeachersRole = ({ urlAfterPrivate, userDetails, masterData }) => {
  return (
    <>
      {/* Conditionally render the Attendance component if the URL matches urlAttendance */}
      {urlAfterPrivate == urlAttendance && (
        <Attendance masterData={masterData} />
      )}
    </>
  )
}

// Export the Teachers component as the default export
export default TeachersRole
