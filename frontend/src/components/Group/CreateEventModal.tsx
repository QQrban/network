import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledTextArea, StyledTextField } from "../Login/styles";

interface CreateEventModalProps {
  openEventModal: boolean;
  setOpenEventModal: React.Dispatch<boolean>;
}

export default function CreateEventModal({
  openEventModal,
  setOpenEventModal,
}: CreateEventModalProps) {
  const handleClose = () => {
    setOpenEventModal(false);
  };

  return (
    <Dialog
      open={openEventModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{
          fontFamily: "SchoolBell",
          fontSize: "36px",
        }}
        id="alert-dialog-title"
      >
        Create Event
      </DialogTitle>
      <DialogContent sx={{ width: "460px" }}>
        <StyledTextField
          sx={{
            mt: "10px",
          }}
          id="eventTitle"
          name="title"
          label="Title"
          type="text"
        />
        <StyledTextArea
          sx={{ mt: "15px" }}
          placeholder="Event Description"
          name="description"
          minRows={5}
          maxRows={6}
          maxLength={600}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
