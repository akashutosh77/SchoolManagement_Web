import React from "react";
import { IConfirmationDialogProps } from "./IComponents";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Styles } from "./Styles";
import CloseIcon from "@mui/icons-material/Close";

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
  title,
  content,
  actions,
  onClose,
  style,
  open,
  size,
  showCloseIcon,
}) => {
  return (
    open && (
      <Dialog
        maxWidth={size}
        open={open}
        onClose={onClose}
        sx={{ ...Styles.confirmationDialog, ...style }}
      >
        {showCloseIcon && (
          <DialogActions>
            <CloseIcon
              fontSize="small"
              className="closeIcon"
              sx={Styles.closeIcon}
              onClick={onClose}
            />
          </DialogActions>
        )}
        {title && (
          <DialogTitle sx={Styles.titleContainer} className="titleContainer">
            {title}
          </DialogTitle>
        )}
        <DialogContent
          sx={Styles.contentContainer}
          className="contentContainer"
        >
          {content}
        </DialogContent>
        {actions && actions?.length > 0 && (
          <DialogActions
            sx={Styles.actionContainer}
            className="actionContainer"
          >
            {actions?.map((action) => (
              <Button
                key={action?.label}
                sx={{ fontFamily: "InterMed" }}
                variant={action.variant}
                onClick={(e) => action.handler(e)}
              ></Button>
            ))}
          </DialogActions>
        )}
      </Dialog>
    )
  ) || null;
};
export default ConfirmationDialog
