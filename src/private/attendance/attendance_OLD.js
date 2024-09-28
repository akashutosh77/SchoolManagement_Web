// export {}
// import { Button, Divider } from "@mui/material"
// import MaterialReactTableField from "components/MaterialReactTableField"
// import { Form, FormikProvider, useFormik } from "formik"
// import { useAuthUserDetailsHook } from "hooks/public/useUserHooks"
// import { useMaterialReactTable } from "material-react-table"
// import moment from "moment"
// import NoData from "noData"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { getAttendanceDetails } from "store/actions/attendanceActions"
// import {
//   clearAttendance,
//   selectAttendanceData
// } from "../../store/slices/attendenceSlice"
// import AttendanceHeader from "./attendanceHeader"
// import { attendanceInitialValues } from "./attendanceInitialValues"
// import AutocompleteField from "components/AutoComplete"

// const Attendance = ({ masterData }) => {
//   const attendanceData = useSelector(selectAttendanceData)
//   const [data, setData] = useState([])
//   const [attendanceStatusMap, setAttendanceStatusMap] = useState({})
//   const [className, setClassName] = useState("")
//   const [attendanceDate, setAttendanceDate] = useState(new Date())
//   const [classId, setClassId] = useState(0)
//   const userDetails = useAuthUserDetailsHook()
//   const dispatch = useDispatch()
//   const columns = [
//     {
//       accessorKey: "name",
//       header: "Name",
//       Cell: ({ cell, row }) => (
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <img
//             src={row.original.photoURL}
//             alt="Student Photo"
//             style={{
//               width: 50,
//               height: 50,
//               objectFit: "cover",
//               borderRadius: "50%",
//               marginRight: 10
//             }}
//           />
//           <div>
//             <div>
//               {row.original.firstName} {row.original.middleName}{" "}
//               {row.original.lastName}
//             </div>
//           </div>
//         </div>
//       )
//     },
//     {
//       accessorKey: "schoolId", // accessor is the "key" in the data
//       header: "schoolId"
//     },
//     {
//       accessorKey: "classId",
//       header: "classId"
//     },
//     {
//       accessorKey: "studentId",
//       header: "studentId"
//     },
//     {
//       accessorKey: "schoolName",
//       header: "schoolName"
//     },
//     {
//       accessorKey: "attendanceStatus",
//       header: "Status",
//       Cell: ({ cell, row }) => (
//         <AutocompleteField
//           value={attendanceStatusMap[row.original.studentId]}
//           onChange={(event, newValue) =>
//             handleAttendanceStatusChange(
//               event,
//               newValue,
//               row.original.studentId
//             )
//           }
//           size="small"
//           options={masterData.attendanceStatuses.map(x => ({
//             id: x.attendanceStatusId.toString(),
//             label: x.attendanceStatus
//           }))}
//           label="Select Status"
//           name={`attendanceStatus-${row.original.studentId}`}
//         />
//       )
//     },
//     {
//       accessorKey: "remarks",
//       header: "remarks"
//     }
//   ]

//   const table = useMaterialReactTable({
//     columns,
//     data,
//     localization: {
//       noRecordsToDisplay: <NoData />,
//       noResultsFound: <NoData />
//     },
//     initialState: {
//       density: "compact",
//       columnVisibility: {
//         schoolId: false,
//         classId: false,
//         studentId: false,
//         schoolName: false
//       }
//     },
//     enableFullScreenToggle: false
//   })

//   useEffect(() => {
//     if (className && attendanceDate && userDetails) {
//       dispatch(
//         getAttendanceDetails({
//           schoolId: userDetails?.schoolId,
//           classId: classId,
//           attendanceDate: moment(new Date(attendanceDate)).format("DD/MM/YYYY")
//         })
//       )
//     } else {
//       dispatch(clearAttendance())
//     }
//   }, [className, attendanceDate, userDetails])

//   useEffect(() => {
//     if (attendanceData) {
//       setData(attendanceData)
//     }
//   }, [attendanceData])

//   const handleAttendanceStatusChange = (event, newValue, studentId) => {
//     formik.handleChange(event)
//     formik.setFieldValue(`attendanceStatus-${studentId}`, newValue?.label)

//     setAttendanceStatusMap(prevState => ({
//       ...prevState,
//       [studentId]: { id: newValue.id, label: newValue.label }
//     }))
//   }

//   const handleClassOnChange = (event, newValue) => {
//     formik.handleChange(event)
//     formik.setFieldValue("class", newValue?.label)
//     formik.setFieldValue("classId", newValue?.id)
//     setClassName(newValue.label)
//     setClassId(parseInt(newValue.id))
//   }

//   const handleDateOnChange = (value, context) => {
//     formik.setFieldValue("attendanceDate", value)
//     setAttendanceDate(value)
//   }

//   const handleSubmitClick = () => {
//     // Handle the form submission logic
//   }

//   const formik = useFormik({
//     initialValues: attendanceInitialValues,
//     onSubmit: values => {
//       console.log(values)
//     }
//   })

//   return (
//     <FormikProvider value={formik}>
//       <Form onSubmit={formik.handleSubmit}></Form>
//       <AttendanceHeader
//         handleClassOnChange={handleClassOnChange}
//         handleDateOnChange={handleDateOnChange}
//         attendanceDate={new Date(attendanceDate)}
//         masterData={masterData}
//       />
//       <Divider sx={{ mt: 1 }}></Divider>
//       <MaterialReactTableField table={table} />
//       <Button onClick={handleSubmitClick}>Submit</Button>
//     </FormikProvider>
//   )
// }

// export default Attendance
