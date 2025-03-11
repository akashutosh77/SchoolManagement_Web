import moment from "moment"

export const attendanceInitialValues = {
  class: "",
  attendanceDate: moment(new Date()).format("DD-MM-YYYY"),
  classId: 0,
  attendanceTable: []
}
