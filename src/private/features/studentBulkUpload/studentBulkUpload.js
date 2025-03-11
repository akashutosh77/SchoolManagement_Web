import { InputFileUpload } from "components/inputFieldUpload";
import { useAuthUserDetailsHook } from "hooks/public/useUserHooks";
import { useState } from "react";
import { useDispatch } from "react-redux";

const StudentBulkUpload = ({ masterData }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useAuthUserDetailsHook();
  return (
    <div>
      <InputFileUpload></InputFileUpload>
    </div>
  );
};

export default StudentBulkUpload;
