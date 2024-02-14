import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ConfirmationDialog = ({
  open,
  handleClose,
  handleAction,
  isPerformingAction,
  dialogTitle,
  dialogContentText,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-describedby="confirmation-alert-dialog"
    >
      {isPerformingAction && (
        <Box sx={{ p: 2 }}>
          <CircularProgress
            sx={{
              mx: "auto",
            }}
          />
        </Box>
      )}
      {!isPerformingAction && (
        <>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="confirmation-alert-dialog"
              color="text.primary"
            >
              {dialogContentText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Discard</Button>
            <Button onClick={handleAction}>Confirm</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
