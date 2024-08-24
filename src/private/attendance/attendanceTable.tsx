import { Grid } from "@mui/material";
import { IAttendanceTableProps } from "components/IComponents";
import { IAttendance, IAttendanceProps } from "store/slices/ISlices";
import { FieldArray } from "formik";
import AutocompleteField from "components/AutoComplete";
import { InputField } from "components/InputField";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const AttendanceTable: React.FC<IAttendanceProps> = ({
  attendanceData,
  masterData,
  handleAttendanceStatusChange,
  formik,
}) => {
  return (
    <FieldArray name="attendanceTable">
      {() => (
        <Grid container xs={12} spacing={1}>
          {formik?.values.attendanceTable.map((data: IAttendance, index) => (
            <>
              <Grid item xs={4}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={data.photoURL}
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
                      {data.firstName} {data.middleName} {data.lastName}
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <AutocompleteField
                  value={{
                    id: data.attendanceStatusId!,
                    label: data.attendanceStatus!,
                  }}
                  onChange={(event, newValue) =>
                    handleAttendanceStatusChange!(
                      event,
                      newValue,
                      data.studentId!,
                      index
                    )
                  }
                  size="small"
                  options={masterData!.attendanceStatuses.map((x) => ({
                    id: x.attendanceStatusId.toString(),
                    label: x.attendanceStatus,
                  }))}
                  label="Select Status"
                  name={`attendanceTable[${index}].attendanceStatus`}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  value={data.remarks}
                  size="small"
                  variant="outlined"
                  label="Remarks"
                  name={`attendanceTable[${index}].remarks`}
                />
              </Grid>
            </>
          ))}
        </Grid>
      )}
    </FieldArray>
  );
};
export default AttendanceTable;
