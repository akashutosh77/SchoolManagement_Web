import { Grid } from "@mui/material"
import { FieldArray } from "formik"
import { Fragment } from "react"
import AutocompleteField from "components/AutoComplete"
import { InputField } from "components/InputField"
import PaginationControls from "./paginationControls"

const AttendanceTable = ({
  attendanceData,
  masterData,
  handleAttendanceStatusChange,
  formik,
  handlePageChange,
  currentItems,
  startIndex,
  currentPage,
  totalPages
}) => {
  return (
    <>
      <FieldArray name="attendanceTable">
        {() => (
          <Grid container spacing={1}>
            {currentItems?.map((data, index) => (
              <Fragment key={data.studentId}>
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
                        marginRight: 10
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
                    // value={{
                    //   id: data.attendanceStatusId!,
                    //   label: data.attendanceStatus!,
                    // }}
                    onChange={(event, newValue) =>
                      handleAttendanceStatusChange(
                        event,
                        newValue,
                        data.studentId,
                        index + startIndex
                      )
                    }
                    size="small"
                    options={masterData.attendanceStatuses.map(
                      x => x.attendanceStatus
                    )}
                    label="Select Status"
                    name={`attendanceTable[${index +
                      startIndex}].attendanceStatus`}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputField
                    size="small"
                    variant="outlined"
                    label="Remarks"
                    name={`attendanceTable[${index + startIndex}].remarks`}
                  />
                </Grid>
              </Fragment>
            ))}
          </Grid>
        )}
      </FieldArray>

      {/* Use PaginationControls component */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default AttendanceTable
