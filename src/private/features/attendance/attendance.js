import { Button, Divider, Box } from "@mui/material";
import { CircularLoader } from "components/CircularLoader";
import { Form, FormikProvider, useFormik } from "formik";
import { useAuthUserDetailsHook } from "hooks/public/useUserHooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttendanceDetails,
  insertOrUpdateAttendanceDetails,
} from "private/features/attendance/store/actions/attendanceActions";
import {
  clearAttendanceData,
  selectAttendance,
  selectAttendanceData,
  selectStudentData,
} from "./store/slices/attendenceSlice";
import AttendanceHeader from "./attendanceHeader";
import AttendanceTable from "./attendanceTable";
import { validationSchema, initialValues } from "./formValues";
import io from "socket.io-client";

const Attendance = ({ masterData }) => {
  const socket = io(process.env.REACT_APP_SOCKET_URL);
  const selectedAttendance = useSelector(selectAttendance);
  const selectedAttendanceData = useSelector(selectAttendanceData);
  const selectedStudentsData = useSelector(selectStudentData);
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [className, setClassName] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [classId, setClassId] = useState(0);
  const dispatch = useDispatch();
  const userDetails = useAuthUserDetailsHook();

  useEffect(() => {
    formik.resetForm();
    dispatch(clearAttendanceData());
  }, []);

  useEffect(() => {
    if (selectedAttendanceData?.length > 0) {
      setAttendanceData(selectedAttendanceData);
    } else if (selectedStudentsData?.length > 0) {
      setAttendanceData(selectedStudentsData);
    } else {
      setAttendanceData([]);
    }
  }, [selectedAttendanceData, selectedStudentsData]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(clearAttendanceData());
      if (className && attendanceDate && userDetails) {
        try {
          await dispatch(
            getAttendanceDetails({
              schoolId: userDetails?.schoolId,
              classId: classId,
              attendanceDate: moment(new Date(attendanceDate)).format(
                "DD/MM/YYYY"
              ),
            })
          );
        } finally {
        }
      }
    };

    fetchData();
  }, [className, attendanceDate, userDetails]);

  useEffect(() => {
    if (attendanceData.length > 0) {
      formik.setFieldValue("attendanceTable", attendanceData);
      attendanceData.map((value, index) => {
        formik.setFieldValue(
          `attendanceTable[${index}].attendanceStatus`,
          value.attendanceStatus
        );
      });
    }
  }, [attendanceData]);

  useEffect(() => {
    if (selectedAttendance.status == "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [selectedAttendance]);

  useEffect(() => {
    socket.on("attendanceUpdated", () => {
      dispatch(clearAttendanceData());

      dispatch(
        getAttendanceDetails({
          schoolId: userDetails?.schoolId,
          classId: classId,
          attendanceDate: moment(new Date(attendanceDate)).format("DD/MM/YYYY"),
        })
      );
    });

    return () => socket.off("attendanceUpdated");
  }, [classId, attendanceDate, userDetails, dispatch]);

  const handleAttendanceStatusChange = (event, newValue, studentId, index) => {
    formik.handleChange(event);
    formik.setFieldValue(
      `attendanceTable[${index}].attendanceStatus`,
      newValue
    );
    formik.setFieldValue(`attendanceTable[${index}].studentId`, studentId);
    formik.setFieldValue(
      `attendanceTable[${index}].attendanceStatusId`,
      masterData?.attendanceStatuses.find((x) => x.attendanceStatus == newValue)
        ?.attendanceStatusId
    );
  };

  const handleClassOnChange = (event, newValue) => {
    formik.resetForm();
    formik.handleChange(event);
    formik.setFieldValue("class", newValue);
    formik.setFieldValue(
      "classId",
      masterData?.classesData.find((x) => x.className == newValue)?.classId
    );
    setClassName(newValue);
    setClassId(
      masterData?.classesData.find((x) => x.className == newValue)?.classId
    );
  };

  const handleDateOnChange = (value, context) => {
    formik.setFieldValue("attendanceDate", value);
    setAttendanceDate(value);
  };

  const handleSubmitClick = () => {
    formik.handleSubmit();
  };

  const handleSubmit = (values) => {
    const attendanceRecords = values?.attendanceTable?.map((value, index) => {
      return {
        schoolId: value?.schoolId,
        classId: classId,
        studentId: value?.studentId,
        attendanceDate: attendanceDate,
        attendanceStatusId: value?.attendanceStatusId,
        remarks: value?.remarks,
      };
    });
    console.log("attendanceRecords", attendanceRecords);
    dispatch(insertOrUpdateAttendanceDetails(attendanceRecords))
      .unwrap()
      .then((res) => {
        console.log("Success:", res);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
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
            isLoading={loading}
            attendanceData={attendanceData}
            masterData={masterData}
            handleAttendanceStatusChange={handleAttendanceStatusChange}
            formik={formik}
          />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button variant="contained" onClick={handleSubmitClick}>
              Submit
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </CircularLoader>
  );
};

export default Attendance;
