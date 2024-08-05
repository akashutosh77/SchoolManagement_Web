import { WidthFull } from "@mui/icons-material";
import { Autocomplete, Box, Container, Grid, TextField, Typography } from "@mui/material";
import AutocompleteField from "components/AutoComplete";
import { IAttendanceHeaderProps } from "components/IComponents";

const AttendanceHeader: React.FC<IAttendanceHeaderProps> = ({handleClassOnChange}) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h5">Attendance</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item xs={6} sx={{textAlign:"center"}}>
          <Autocomplete
           onChange={handleClassOnChange}
            size="small"
            options={[
              { id: "1", label: "FirstA" },
              { id: "2", label: "FirstB" },
              { id: "3", label: "SecondA" },
              { id: "4", label: "SecondB" },
            ]}
            renderInput={(params) => (
              <TextField {...params} name="class" sx={{width:200}} label="Class" />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default AttendanceHeader;
