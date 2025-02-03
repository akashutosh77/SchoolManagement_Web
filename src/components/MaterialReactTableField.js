import { MaterialReactTable } from "material-react-table"

const MaterialReactTableField = ({ table, ...rest }) => {
  return <MaterialReactTable table={table} {...rest} />
}
export default MaterialReactTableField
