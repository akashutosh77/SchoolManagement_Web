import { SyntheticEvent } from "react";
import { Idrpdown } from "../ICommonUtils";
import { Breakpoint } from "@mui/system";
import {
  ButtonPropsSizeOverrides,
  TextFieldPropsSizeOverrides,
  TextFieldVariants,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { TVariant, TSelectFieldChange } from "../TCommonUtils";
import { MRT_TableInstance } from "material-react-table";

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
  style?: object;
  open: boolean;
  actions?: IConfirmationDialogActionProps[];
  onClose: () => void;
  size: Breakpoint;
  showCloseIcon?: boolean;
}

export interface ICustomButtonProps {
  name: string;
  children: string | React.ReactNode;
  variant: TVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  fullWidth?: boolean;
  customStyle?: object;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
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
  label: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  variant?: TextFieldVariants | undefined;
  autoComplete?: string;
  size?:
    | OverridableStringUnion<"small" | "medium", TextFieldPropsSizeOverrides>
    | undefined;
  fullWidth?: boolean | undefined;
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
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export interface IUploadButtonProps {
  component: string;
  variant: TVariant;
}

export interface IBackgroundProps {
  children: React.ReactNode;
}

export interface IDrawerAppBarProps {
  window?: () => Window;
  handleDrawerToggle: () => void;
  handleNavItemsBeforeLoginClick: (e: string) => void;
  handleSchoolNameClick: () => void;
  mobileOpen: boolean;
  isUserLoggedIn: boolean;
  handleNavItemsBeforeLogoutClick: () => void;
  handleMenuClick: (e: string) => void;
  openMenu:{ [key: string]: boolean };
  handleTopMenuItemClick:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>void;
}
export interface IVerticalMenuItemsProps {
  handleMenuClick: (e: string) => void;
  openMenu:{ [key: string]: boolean };
}

export interface IMaterialReactTableFieldProps {
  table: MRT_TableInstance<any>;
}
