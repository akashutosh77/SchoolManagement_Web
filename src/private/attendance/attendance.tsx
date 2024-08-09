import { Button, Divider } from "@mui/material";
import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import MaterialReactTableField from "components/MaterialReactTableField";
import { Form, FormikProvider, useFormik } from "formik";
import { useAuthUserDetailsHook } from "hooks/useUserHooks";
import { Idrpdown } from "ICommonUtils";
import { useMaterialReactTable } from "material-react-table";
import moment from "moment";
import NoData from "noData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store";
import { getAttendanceDetails } from "store/actions/attendanceActions";
import { IAttendance } from "store/slices/ISlices";
import { parseAndFormatDate } from "utils";
import { selectAttendanceData } from "../../store/slices/attendenceSlice";
import AttendanceHeader from "./attendanceHeader";
import { attendanceInitialValues } from "./attendanceInitialValues";
import { columns } from "utils";

const Attendance: React.FC = () => {
  const attendanceData = useSelector(selectAttendanceData);
  const [data, setData] = useState<IAttendance[]>([]);
  const [className, setClassName] = useState("");
  const [attendanceDate, setAttendanceDate] = useState<string>(
    parseAndFormatDate(moment(new Date()).format('DD-MM-YYYY'))
  );
  const [classId, setClassId] = useState<number>(0);
  const userDetails = useAuthUserDetailsHook();
  const dispatch = useDispatch<AppDispatch>();

  const table = useMaterialReactTable({
    columns,
    data,
    localization: {
      noRecordsToDisplay: (<NoData />) as any,
      noResultsFound: (<NoData />) as any,
    },
    initialState:{
      columnVisibility:{
        schoolId: false,
        classId: false,
        studentId: false,
        schoolName: false,
      }
    },
    enableFullScreenToggle: false,
  });

  useEffect(() => {
    if (className && attendanceDate && userDetails) {
      dispatch(
        getAttendanceDetails({
          schoolId: userDetails?.schoolId!,
          classId: classId,
          attendanceDate: parseAndFormatDate(formik.values.attendanceDate),
        })
      );
    }
  }, [className, attendanceDate, userDetails]);
  useEffect(() => {
    if (attendanceData) {
      setData(attendanceData);
    }
  }, [attendanceData]);

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
    setAttendanceDate(value!.toString());
  };
  const handleSubmitClick = () => {};
  {
  }

  const formik = useFormik({
    initialValues: attendanceInitialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log("the formik values are", formik.values);
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}></Form>
      <AttendanceHeader
        handleClassOnChange={handleClassOnChange}
        handleDateOnChange={handleDateOnChange}
        attendanceDate={moment(attendanceDate).toDate()}
      />
      <Divider sx={{ mt: 1 }}></Divider>
      <MaterialReactTableField table={table} />
      <Button onClick={handleSubmitClick}>Submit</Button>
    </FormikProvider>
  );
};
export default Attendance;
