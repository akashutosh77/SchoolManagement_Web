import { useMemo } from "react"
import MaterialReactTableField from "components/MaterialReactTableField"
import AutocompleteField from "components/AutoComplete"
import { InputField } from "components/InputField"
import { Box } from "@mui/material"

const AttendanceTable = ({
  attendanceData,
  isLoading,
  masterData,
  handleAttendanceStatusChange,
  formik
}) => {
  const columns = useMemo(() => [
    {
      accessorKey: 'student',
      header: 'Student',
      Cell: ({ row }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={row.original.photoURL}
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
            {`${row.original.firstName} ${row.original.middleName || ''} ${row.original.lastName}`}
          </div>
        </div>
      ),
      size: 300,
    },
    {
      accessorKey: 'attendanceStatus',
      header: 'Status',
      Cell: ({ row }) => (
        <Box sx={{ width: '200px' }}>
          <AutocompleteField
            onChange={(event, newValue) =>
              handleAttendanceStatusChange(
                event,
                newValue,
                row.original.studentId,
                row.index
              )
            }
            size="small"
            options={masterData.attendanceStatuses.map(x => x.attendanceStatus)}
            label="Select Status"
            name={`attendanceTable[${row.index}].attendanceStatus`}
            value={formik.values.attendanceTable[row.index]?.attendanceStatus || null}
          />
        </Box>
      ),
      size: 200,
    },
    {
      accessorKey: 'remarks',
      header: 'Remarks',
      Cell: ({ row }) => (
        <Box sx={{ width: '180px' }}>
          <InputField
            size="small"
            variant="outlined"
            label="Remarks"
            name={`attendanceTable[${row.index}].remarks`}
            value={formik.values.attendanceTable[row.index]?.remarks || ''}
            onKeyDown={(e) => {
              // Prevents the keydown event from bubbling up to the table
              // This stops the table from capturing keyboard events like arrow keys
              // which would otherwise navigate between cells instead of allowing
              // normal text input behavior within the field
              e.stopPropagation();
            }}
          />
        </Box>
      ),
    }
  ], [masterData.attendanceStatuses, handleAttendanceStatusChange, formik.values.attendanceTable]);

  return (
    <MaterialReactTableField
      data={attendanceData}
      columns={columns}
      isLoading={isLoading}
      enableTopToolbar={true}
      enableColumnActions={false}
      enableColumnFilters={true}
      enablePagination={true}
      enableSorting={true}
      enableColumnResizing={false}
      enableFullScreenToggle={false}
      initialState={{
        density: 'compact',
        pagination: { pageSize: 10, pageIndex: 0 }
      }}
    />
  )
}

export default AttendanceTable
