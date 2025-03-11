import * as yup from "yup"

export const validationSchema = yup.object().shape({
  attendanceTable: yup.array().of(
    yup.object().shape({
      attendanceStatus: yup
        .string()
        .nullable()
        .required("Field cannot be blank"),
      remarks: yup
        .string()
        .nullable()
        .required("Field cannot be blank")
    })
  )
})
