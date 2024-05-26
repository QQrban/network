import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledTextArea, StyledTextField } from "../Login/styles";
import successBtn from "../../../public/icons/successBtn.svg";
import checkIcon from "../../../public/icons/check.svg";
import crossIcon from "../../../public/icons/cross.svg";
import ConfirmBtn from "../shared/ConfirmBtn";
import { Box, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { fetchFromServer } from "@/lib/api";
import SimpleAlert from "../shared/Alert";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  setCreatedGroup: React.Dispatch<boolean>;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Group Name is Required")
    .min(5, "Group name must be at least 5 characters"),
  description: Yup.string()
    .required("Group Description is Required")
    .min(50, "Group description must be at least 50 characters"),
});

export default function CreateGroupModal({
  open,
  setOpen,
  setCreatedGroup,
}: Props) {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [operationSuccessful, setOperationSuccessful] =
    useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetchFromServer("/group", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        });
        if (response.ok) {
          setOperationSuccessful(true);
          resetForm();
          const id = setTimeout(() => {
            handleClose();
          }, 1000);
          setTimeoutId(id);
          setCreatedGroup(true);
        } else {
          setOperationSuccessful(false);
        }
      } catch (error) {
        console.error("Error during login:", error);
      } finally {
        setShowAlert(true);
      }
    },
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: formik.handleSubmit,
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Schoolbell",
            fontSize: "30px",
            fontWeight: 600,
          }}
        >
          Create Group
        </DialogTitle>
        <DialogContent>
          <StyledTextField
            margin="dense"
            id="name"
            name="title"
            label="Group name"
            type="text"
            fullWidth
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <StyledTextArea
            placeholder="Group Description"
            name="description"
            minRows={5}
            maxRows={6}
            maxLength={600}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{
              mt: "23px",
              borderColor:
                formik.touched.description && Boolean(formik.errors.description)
                  ? "red"
                  : "",
            }}
          />
          {formik.touched.description && formik.errors.description && (
            <Typography color="error" sx={{ mt: 2 }}>
              {formik.errors.description}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              fontFamily: "Schoolbell",
              fontSize: "25px",
              mr: "10px",
            }}
            color="error"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Box sx={{ width: "130px" }}>
            <ConfirmBtn
              type="submit"
              backgroundImage={successBtn.src}
              text="Create"
            />
          </Box>
        </DialogActions>
        {showAlert && (
          <SimpleAlert
            severity={operationSuccessful ? "success" : "error"}
            text={
              operationSuccessful
                ? "Group was created successfully"
                : "Something went wrong!"
            }
            icon={
              operationSuccessful ? (
                <Image width={29} height={28} src={checkIcon} alt="check" />
              ) : (
                <Image width={29} height={28} src={crossIcon} alt="cross" />
              )
            }
          />
        )}
      </Dialog>
    </>
  );
}
