import { Button, Divider } from "@mui/material";
import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { CircularLoader } from "components/CircularLoader";
import { Form, FormikProvider, useFormik } from "formik";
import { useAuthUserDetailsHook } from "hooks/public/useUserHooks";
import { Idrpdown } from "ICommonUtils";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store";
import { getAttendanceDetails } from "store/actions/attendanceActions";
import { IAttendance, IAttendanceProps } from "store/slices/ISlices";
import {
  clearAttendance,
  selectAttendance,
  selectAttendanceData,
  selectStudentData,
} from "../../store/slices/attendenceSlice";
import AttendanceHeader from "./attendanceHeader";
import { attendanceInitialValues } from "./attendanceInitialValues";
import AttendanceTable from "./attendanceTable";
import { attendanceValidationScheme } from "./attendanceValidationSchema";

const Attendance: React.FC<IAttendanceProps> = ({ masterData }) => {
  const selectedAttendance = useSelector(selectAttendance);
  const selectedAttendanceData = useSelector(selectAttendanceData);
  const selectedStudentsData = useSelector(selectStudentData);
  const [loading, setLoading] = useState<boolean>(true);
  const [attendanceData, setAttendanceData] = useState<IAttendance[]>([]);
  const [className, setClassName] = useState("");
  const [attendanceDate, setAttendanceDate] = useState<Date>(new Date());
  const [classId, setClassId] = useState<number>(0);
  const userDetails = useAuthUserDetailsHook();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    formik.resetForm();
    dispatch(clearAttendance());
  }, []);
  useEffect(() => {
    if (selectedAttendanceData?.length! > 0) {
      setAttendanceData(selectedAttendanceData!);
    } else if (selectedStudentsData?.length! > 0) {
      setAttendanceData(selectedStudentsData!);
    }
    else{
        setAttendanceData([]);
    }
  }, [selectedAttendanceData, selectedStudentsData]);
  useEffect(() => {
    const fetchData = async () => {
      formik.resetForm();
      dispatch(clearAttendance());
      if (className && attendanceDate && userDetails) {
        try {
          await dispatch(
            getAttendanceDetails({
              schoolId: userDetails?.schoolId!,
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
    }
  }, [attendanceData]);
  useEffect(() => {
    console.log("selectedAttendance status is", selectedAttendance.status);
    if (selectedAttendance.status == "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [selectedAttendance]);

  const handleAttendanceStatusChange = (
    event: React.SyntheticEvent,
    newValue: Idrpdown | null,
    studentId: number,
    index: number
  ) => {
    formik.handleChange(event);
    formik.setFieldValue(
      `attendanceTable[${index}].attendanceStatus`,
      newValue?.label
    );
    formik.setFieldValue(
      `attendanceTable[${index}].attendanceStatusId`,
      newValue?.id
    );
  };

  const handleClassOnChange = (
    event: React.SyntheticEvent,
    newValue: Idrpdown | null
  ) => {
    formik.handleChange(event);
    formik.setFieldValue("class", newValue?.label);
    formik.setFieldValue("classId", newValue?.id);
    setClassName(newValue!.label);
    setClassId(parseInt(newValue!.id));
  };

  const handleDateOnChange = (
    value: Date | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    formik.setFieldValue("attendanceDate", value);
    setAttendanceDate(value!);
  };

  const handleSubmitClick = () => {
   formik.handleSubmit()
  };

  const formik = useFormik({
    initialValues: attendanceInitialValues,
    validationSchema: attendanceValidationScheme,
    onSubmit: (values) => {
      console.log('onSubmit has fired');
    },
  });

  console.log("the formik values are", formik);
  console.log('the formik errors are', formik.errors);
  return (
    <CircularLoader loading={loading}>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
        <AttendanceHeader
          handleClassOnChange={handleClassOnChange}
          handleDateOnChange={handleDateOnChange}
          attendanceDate={new Date(attendanceDate)}
          masterData={masterData!}
        />
        <Divider sx={{ mt: 1, mb: 2 }}></Divider>

        <AttendanceTable
          attendanceData={attendanceData}
          masterData={masterData}
          handleAttendanceStatusChange={handleAttendanceStatusChange}
          formik={formik}
        />

        <Button variant="contained" onClick={handleSubmitClick}>Submit</Button>
        </Form>
      </FormikProvider>
    </CircularLoader>
  );
};

export default Attendance;
