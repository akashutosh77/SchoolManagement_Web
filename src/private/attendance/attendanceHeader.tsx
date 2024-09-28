import { Box, Grid, Typography } from "@mui/material";
import AutocompleteField from "components/AutoComplete";
import { DatePickerField } from "components/DatePickerField";
import { IAttendanceHeaderProps } from "components/IComponents";
import { Idrpdown } from "ICommonUtils";

const AttendanceHeader: React.FC<IAttendanceHeaderProps> = ({
  handleClassOnChange,
  handleDateOnChange,
  attendanceDate,
  masterData,
}) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Attendance
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <AutocompleteField
            size="small"
            onChange={handleClassOnChange}
            options={masterData.classesData.map((x) => x.className)}
            label="Select Class"
            name="class"
          />
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <DatePickerField
            //style={{ width: "200px" }}
            slotProps={{ textField: { size: "small" } }}
            label="Date"
            name="attendanceDate"
            onChange={handleDateOnChange}
            value={attendanceDate}
            format="dd/MM/yyyy"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default AttendanceHeader;
