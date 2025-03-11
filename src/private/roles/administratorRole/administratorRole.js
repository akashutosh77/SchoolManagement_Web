import StudentBulkUpload from "private/features/studentBulkUpload/studentBulkUpload";
import { urlBulkUploadStudents } from "utils";

// Define the Teachers functional component
const AdministratorRole = ({ urlAfterPrivate, userDetails, masterData }) => {
  return (
    <>
      {/* Conditionally render the Attendance component if the URL matches urlAttendance */}
      {urlAfterPrivate == urlBulkUploadStudents && (
        <StudentBulkUpload masterData={masterData} />
      )}
    </>
  );
};

// Export the Teachers component as the default export
export default AdministratorRole;
