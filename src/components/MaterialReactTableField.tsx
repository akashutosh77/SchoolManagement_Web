import { MaterialReactTable } from "material-react-table";
import { IMaterialReactTableFieldProps } from "./IComponents";
import NoData from "noData";

const MaterialReactTableField : React.FC<IMaterialReactTableFieldProps> =({table,...rest}) =>{
    return(
        <MaterialReactTable table={table} />
    )

}
export default MaterialReactTableField