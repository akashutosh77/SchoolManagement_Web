import { MaterialReactTable } from "material-react-table";
import { IMaterialReactTableFieldProps } from "./IComponents";

const MaterialReactTableField : React.FC<IMaterialReactTableFieldProps> =({table,...rest}) =>{
    return(
        <MaterialReactTable table={table} />
    )

}
export default MaterialReactTableField