import { WidthFull } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AutocompleteField from "components/AutoComplete";
import { DatePickerField } from "components/DatePickerField";
import { IAttendanceHeaderProps } from "components/IComponents";

const AttendanceHeader: React.FC<IAttendanceHeaderProps> = ({
  handleClassOnChange,
  handleDateOnChange,
}) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>Attendance</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <AutocompleteField
            size="small"
            onChange={handleClassOnChange}
            options={[
              { id: "1", label: "FirstA" },
              { id: "2", label: "FirstB" },
              { id: "3", label: "SecondA" },
              { id: "4", label: "SecondB" },
            ]}
            label="Class"
            name="class"
            //style={{width:200}}
            
          />
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <DatePickerField
            //style={{ width: "200px" }}
            slotProps={{ textField: { size: "small" } }}
            label="Date"
            name="attendanceDate"
            onChange={handleDateOnChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default AttendanceHeader;
