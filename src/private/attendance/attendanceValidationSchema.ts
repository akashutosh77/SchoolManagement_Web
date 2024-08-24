import * as yup from "yup";

export const attendanceValidationScheme = yup.object().shape({
  attendanceTable: yup.array().of(
    yup.object().shape({
      attendanceStatus: yup
        .string()
        .nullable()
        .required("Attendance Status cannot be blank"),
      remarks: yup
        .string()
        .nullable()
        .required("Remarks cannot be blank"),
    })
  ),
});
