import StudentBulkUpload from "private/features/studentBulkUpload/studentBulkUpload";
import { urlBulkUploadStudents } from "utils";

const AdministratorRole = ({ urlAfterPrivate, userDetails, masterData }) => {
  return (
    <>
      {urlAfterPrivate == urlBulkUploadStudents && (
        <StudentBulkUpload masterData={masterData} />
      )}
    </>
  );
};

export default AdministratorRole;
