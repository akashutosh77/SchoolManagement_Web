import { OverridableStringUnion } from '@mui/types';
import { ButtonPropsVariantOverrides, SelectChangeEvent} from '@mui/material';


export type TVariant = OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>
export type TSelectFieldChange = (e: SelectChangeEvent<HTMLSelectElement>, child: React.ReactNode)=>void