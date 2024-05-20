import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ConfirmBtn from "./ConfirmBtn";
import confirmBtn from "../../../public/icons/confirmButton.svg";
import { Box } from "@mui/material";

interface AlertDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogText: string;
  title: string;
  onConfirm: () => void;
}

export default function AlertDialog({
  open,
  setOpen,
  dialogText,
  title,
  onConfirm,
}: AlertDialogProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{
          fontFamily: "Schoolbell !important",
          fontSize: "24px",
        }}
        id="alert-dialog-title"
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          sx={{ fontFamily: "Schoolbell", fontSize: "20px", color: "tomato" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Box
          sx={{
            maxWidth: "120px",
          }}
        >
          <ConfirmBtn
            backgroundImage={confirmBtn.src}
            text="Confirm"
            onClick={onConfirm}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}
