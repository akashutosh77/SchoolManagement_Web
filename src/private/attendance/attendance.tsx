import { IAttendanceProps } from "components/IComponents";
import MaterialReactTableField from "components/MaterialReactTableField";
import AttendanceHeader from "./attendanceHeader";
import { useEffect, useState } from "react";
import { Idrpdown } from "ICommonUtils";
import { Button, Divider } from "@mui/material";
import { Form, useFormik, FormikProvider } from "formik";
import { attendanceInitialValues } from "./attendanceInitialValues";
import { useMaterialReactTable } from "material-react-table";
import NoData from "noData";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { getAttendanceDetails } from "store/actions/attendanceActions";
import { useAuthUserDetailsHook } from "hooks/useUserHooks";
import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";

const Attendance: React.FC = () => {
  const userDetails = useAuthUserDetailsHook();
  const dispatch = useDispatch<AppDispatch>();
  const handleClassOnChange = (
    event: React.SyntheticEvent,
    newValue: Idrpdown | null
  ) => {
    //formik.handleChange(event);
    formik.setFieldValue("class",newValue?.label );
    formik.setFieldValue("classId",newValue?.id );
    //alert("handle change is fired" + JSON.stringify(newValue));
  };
  // const handleClassOnChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
  //   formik.handleChange(event);
  // }
  const handleDateOnChange = (value: Date|null, context: PickerChangeHandlerContext<DateValidationError>) => {
    //formik.handleChange(value);
  };
  const data: any = []; // your data source
  const columns = [
    {
      accessorKey: "name", // accessor is the "key" in the data
      header: "Name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
  ];
  const table = useMaterialReactTable({
    columns,
    data,
    localization: {
      noRecordsToDisplay: (<NoData />) as any,
      noResultsFound: (<NoData />) as any,
    },
    enableFullScreenToggle: false,
  });
  const formik = useFormik({
    initialValues: attendanceInitialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleSubmitClick = () => {
    dispatch(
      getAttendanceDetails({
        schoolId: userDetails?.schoolId!,
        classId: formik.values.classId,
      })
    );
  };
  {
    console.log("the values are", formik.values);
  }
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}></Form>
      <AttendanceHeader
        handleClassOnChange={handleClassOnChange}
        handleDateOnChange={handleDateOnChange}
      />
      <Divider sx={{ mt: 1 }}></Divider>
      <MaterialReactTableField table={table} />
      <Button onClick={handleSubmitClick}>Submit</Button>
    </FormikProvider>
  );
};
export default Attendance;
