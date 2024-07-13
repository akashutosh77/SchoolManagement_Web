import { SyntheticEvent } from "react";
import { Idrpdown } from "../ICommonUtils";
import { Breakpoint } from "@mui/system";
import {
  ButtonPropsSizeOverrides,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { TVariant, TSelectFieldChange } from "../TCommonUtils";

export interface IReusableAutocompleteProps {
  label: string;
  name: string;
  value?: Idrpdown | null;
  options: Idrpdown[];
  onChange?: (
    e: SyntheticEvent<Element, Event>,
    value: Idrpdown | null
  ) => void;
  isOptionEqualToValue?: (option: Idrpdown, value: Idrpdown) => boolean;
}
export interface ICircularLoaderProps {
  loading: boolean;
  children: React.ReactNode;
}

interface IConfirmationDialogActionProps {
  label: string;
  variant: TVariant;
  handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export interface IConfirmationDialogProps {
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  customStyle: object;
  open: boolean;
  actions?: IConfirmationDialogActionProps[];
  handleClose: () => void;
  size: Breakpoint;
  showCloseIcon: boolean;
}

export interface ICustomButtonProps {
  children: string | React.ReactNode;
  variant: TVariant;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  fullWidth?: boolean;
  customStyle?: object;
  disabled?: boolean;
  size?: OverridableStringUnion<
    "small" | "medium" | "large",
    ButtonPropsSizeOverrides
  >;
}

export interface IDatePickerProps {
  name: string;
  label: string;
  inputFormat?: string;
  value: Date;
  minDate?: Date;
  onError?: (error: DateValidationError, value: Date | null) => void;
  onChange?: (
    value: Date | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void;
}

export interface IInputFieldProps {
  name: string;
  type?: React.HTMLInputTypeAttribute;
}
interface IData {
  id: number | string;
  disabled?: boolean;
  label: string;
}
export interface ISelectFieldProps {
  name: string;
  label: string;
  data: IData[];
  onChange: TSelectFieldChange;
  size?: "small" | "medium";
  required?: boolean;
  fullWidth?: boolean;
  disabled?:boolean;
  error?: boolean;
  helperText?: string
}

export interface IUploadButtonProps {
  component: string;
  variant: TVariant
}

export interface IBackgroundProps {
  children: React.ReactNode;
}

export interface IDrawerAppBarProps {
  window?: () => Window;
}
