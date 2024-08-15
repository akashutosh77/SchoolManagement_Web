import { Button, Divider } from "@mui/material";
import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { IAttendanceProps } from "components/IComponents";
import MaterialReactTableField from "components/MaterialReactTableField";
import { Form, FormikProvider, useFormik } from "formik";
import { useAuthUserDetailsHook } from "hooks/public/useUserHooks";
import { Idrpdown } from "ICommonUtils";
import { MRT_Cell, MRT_Row, useMaterialReactTable } from "material-react-table";
import moment from "moment";
import NoData from "noData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store";
import { getAttendanceDetails } from "store/actions/attendanceActions";
import { IAttendance } from "store/slices/ISlices";
import { parseAndFormatDate } from "utils";
import {
  clearAttendance,
  selectAttendanceData,
} from "../../store/slices/attendenceSlice";
import AttendanceHeader from "./attendanceHeader";
import { attendanceInitialValues } from "./attendanceInitialValues";
import { MRT_ColumnDef } from "material-react-table";

const Attendance: React.FC<IAttendanceProps> = ({ masterData }) => {
  const attendanceData = useSelector(selectAttendanceData);
  const [data, setData] = useState<IAttendance[]>([]);
  const [className, setClassName] = useState("");
  const [attendanceDate, setAttendanceDate] = useState<Date>(new Date());
  const [classId, setClassId] = useState<number>(0);
  const userDetails = useAuthUserDetailsHook();
  const dispatch = useDispatch<AppDispatch>();
  const columns: MRT_ColumnDef<IAttendance>[] = [
    {
      accessorKey: "name",
      header: "Name",
      Cell: ({
        cell,
        row,
      }: {
        cell: MRT_Cell<IAttendance>;
        row: MRT_Row<IAttendance>;
      }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={row.original.photoURL}
            alt="Student Photo"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: "50%",
              marginRight: 10,
            }}
          />
          <div>
            <div>
              {row.original.firstName} {row.original.middleName}{" "}
              {row.original.lastName}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "schoolId", // accessor is the "key" in the data
      header: "schoolId",
    },
    {
      accessorKey: "classId",
      header: "classId",
    },
    {
      accessorKey: "studentId",
      header: "studentId",
    },
    {
      accessorKey: "schoolName",
      header: "schoolName",
    },
    {
      accessorKey: "attendanceStatus",
      header: "Status",
    },
    {
      accessorKey: "remarks",
      header: "remarks",
    },
  ];
  const table = useMaterialReactTable({
    columns,
    data,
    localization: {
      noRecordsToDisplay: (<NoData />) as any,
      noResultsFound: (<NoData />) as any,
    },
    initialState: {
      density: "compact",
      columnVisibility: {
        schoolId: false,
        classId: false,
        studentId: false,
        schoolName: false,
      },
    },
    enableFullScreenToggle: false,
  });

  useEffect(() => {
    if (className && attendanceDate && userDetails) {
      dispatch(
        getAttendanceDetails({
          schoolId: userDetails?.schoolId!,
          classId: classId,
          attendanceDate: moment(new Date(attendanceDate)).format("DD/MM/YYYY"),
        })
      );
    } else {
      dispatch(clearAttendance());
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
    setAttendanceDate(value!);
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
        attendanceDate={new Date(attendanceDate)}
        masterData={masterData}
      />
      <Divider sx={{ mt: 1 }}></Divider>
      <MaterialReactTableField table={table} />
      <Button onClick={handleSubmitClick}>Submit</Button>
    </FormikProvider>
  );
};
export default Attendance;
