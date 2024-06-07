import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface PostImageDialog {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<boolean>;
  selectedImage: string;
  setSelectedImage: React.Dispatch<string>;
}

export default function PostImageDialog({
  openDialog,
  setOpenDialog,
  setSelectedImage,
  selectedImage,
}: PostImageDialog) {
  const handleClose = () => {
    setOpenDialog(false);
    setSelectedImage("");
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          width: "600px",
          height: "600px",
          alignSelf: "flex-start",
          m: "0 auto",
          background: `url(http://localhost:8888/file/${selectedImage})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundColor: "#838383",
        }}
      ></Box>
    </Dialog>
  );
}
