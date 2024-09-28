import { Button, Divider } from "@mui/material"
import { CircularLoader } from "components/CircularLoader"
import { Form, FormikProvider, useFormik } from "formik"
import { useAuthUserDetailsHook } from "hooks/public/useUserHooks"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAttendanceDetails } from "store/actions/attendanceActions"
import {
  clearAttendance,
  selectAttendance,
  selectAttendanceData,
  selectStudentData
} from "../../store/slices/attendenceSlice"
import AttendanceHeader from "./attendanceHeader"
import { attendanceInitialValues } from "./attendanceInitialValues"
import AttendanceTable from "./attendanceTable"
import { attendanceValidationScheme } from "./attendanceValidationSchema"

const Attendance = ({ masterData }) => {
  const selectedAttendance = useSelector(selectAttendance)
  const selectedAttendanceData = useSelector(selectAttendanceData)
  const selectedStudentsData = useSelector(selectStudentData)
  const [loading, setLoading] = useState(true)
  const [attendanceData, setAttendanceData] = useState([])
  const [className, setClassName] = useState("")
  const [attendanceDate, setAttendanceDate] = useState(new Date())
  const [classId, setClassId] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 10
  const [endIndex, setEndIndex] = useState(startIndex + itemsPerPage)
  const [currentItems, setCurrentItems] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const dispatch = useDispatch()
  const userDetails = useAuthUserDetailsHook()

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    setStartIndex(startIndex)
    const endIndex = startIndex + itemsPerPage
    setEndIndex(startIndex + itemsPerPage)
    setCurrentItems(formik?.values.attendanceTable.slice(startIndex, endIndex))
  }, [currentPage])
  useEffect(() => {
    setCurrentItems(attendanceData.slice(startIndex, endIndex))
  }, [startIndex, endIndex])
  useEffect(() => {
    formik.resetForm()
    dispatch(clearAttendance())
  }, [])
  useEffect(() => {
    if (selectedAttendanceData?.length > 0) {
      setAttendanceData(selectedAttendanceData)
    } else if (selectedStudentsData?.length > 0) {
      setAttendanceData(selectedStudentsData)
    } else {
      setAttendanceData([])
    }
  }, [selectedAttendanceData, selectedStudentsData])
  useEffect(() => {
    const fetchData = async () => {
      dispatch(clearAttendance())
      if (className && attendanceDate && userDetails) {
        try {
          await dispatch(
            getAttendanceDetails({
              schoolId: userDetails?.schoolId,
              classId: classId,
              attendanceDate: moment(new Date(attendanceDate)).format(
                "DD/MM/YYYY"
              )
            })
          )
        } finally {
        }
      }
    }

    fetchData()
  }, [className, attendanceDate, userDetails])
  useEffect(() => {
    if (attendanceData.length > 0) {
      console.log(`the startIndex${startIndex} and the end index ${endIndex}`)
      formik.setFieldValue("attendanceTable", attendanceData)
      attendanceData.map((value, index) => {
        formik.setFieldValue(
          `attendanceTable[${index}].attendanceStatus`,
          value.attendanceStatus
        )
      })

      setTotalPages(Math.ceil(attendanceData.length / itemsPerPage))
      setCurrentPage(1)
      setCurrentItems(attendanceData.slice(startIndex, endIndex))
    }
  }, [attendanceData])
  useEffect(() => {
    if (selectedAttendance.status == "loading") {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [selectedAttendance])

  const handleAttendanceStatusChange = (event, newValue, studentId, index) => {
    formik.handleChange(event)
    formik.setFieldValue(`attendanceTable[${index}].attendanceStatus`, newValue)
    formik.setFieldValue(
      `attendanceTable[${index}].attendanceStatusId`,
      masterData?.attendanceStatuses.find(x => x.attendanceStatus == newValue)
        ?.attendanceStatusId
    )
  }

  const handleClassOnChange = (event, newValue) => {
    formik.resetForm()
    formik.handleChange(event)
    formik.setFieldValue("class", newValue)
    formik.setFieldValue(
      "classId",
      masterData?.classesData.find(x => x.className == newValue)?.classId
    )
    setClassName(newValue)
    setClassId(
      masterData?.classesData.find(x => x.className == newValue)?.classId
    )
  }

  const handleDateOnChange = (value, context) => {
    formik.setFieldValue("attendanceDate", value)
    setAttendanceDate(value)
  }

  const handleSubmitClick = () => {
    formik.handleSubmit()
  }
  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }
  const formik = useFormik({
    initialValues: attendanceInitialValues,
    validationSchema: attendanceValidationScheme,
    onSubmit: values => {
      console.log("onSubmit has fired")
    }
  })

  console.log("the formik values are", formik)
  console.log("the formik errors are", formik.errors)
  return (
    <CircularLoader loading={loading}>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <AttendanceHeader
            handleClassOnChange={handleClassOnChange}
            handleDateOnChange={handleDateOnChange}
            attendanceDate={new Date(attendanceDate)}
            masterData={masterData}
          />
          <Divider sx={{ mt: 1, mb: 2 }}></Divider>

          <AttendanceTable
            attendanceData={attendanceData}
            masterData={masterData}
            handleAttendanceStatusChange={handleAttendanceStatusChange}
            handlePageChange={handlePageChange}
            currentItems={currentItems}
            startIndex={startIndex}
            currentPage={currentPage}
            totalPages={totalPages}
            formik={formik}
          />

          <Button variant="contained" onClick={handleSubmitClick}>
            Submit
          </Button>
        </Form>
      </FormikProvider>
    </CircularLoader>
  )
}

export default Attendance
