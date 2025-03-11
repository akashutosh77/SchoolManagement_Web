import moment from "moment"

export const initialValues = {
  class: "",
  attendanceDate: moment(new Date()).format("DD-MM-YYYY"),
  classId: 0,
  attendanceTable: []
}