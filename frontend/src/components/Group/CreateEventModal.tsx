import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledTextArea, StyledTextField } from "../Login/styles";
import successBtn from "../../../public/icons/successBtn.svg";
import ConfirmBtn from "../shared/ConfirmBtn";
import { Box, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchFromServer } from "@/lib/api";
import { useEffect, useState } from "react";
import { EventProps } from "@/types/types";

interface CreateEventModalProps {
  openEventModal: boolean;
  setOpenEventModal: React.Dispatch<boolean>;
  groupID: number;
  addNewEvent: (newEvent: EventProps) => void;
}

interface FormValues {
  title: string;
  description: string;
  groupID: number;
  time: string | null;
}

const initialValues: FormValues = {
  title: "",
  description: "",
  groupID: 0,
  time: null,
};

const validationSchema = Yup.object({
  title: Yup.string().min(5).required("Required field"),
  description: Yup.string().min(40).required("Required field"),
  time: Yup.string().required("Required field"),
});

export default function CreateEventModal({
  openEventModal,
  setOpenEventModal,
  groupID,
  addNewEvent,
}: CreateEventModalProps) {
  const handleClose = () => {
    setOpenEventModal(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetchFromServer("/event", {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          resetForm();
          setOpenEventModal(false);
          const newEvent: EventProps = await response.json();
          console.log(newEvent);

          addNewEvent(newEvent);
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    },
  });

  return (
    <Dialog
      PaperProps={{
        component: "form",
        onSubmit: formik.handleSubmit,
      }}
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
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <StyledTextArea
          placeholder="Event Description"
          name="description"
          minRows={5}
          maxRows={6}
          maxLength={600}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{
            mt: "15px",
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
        <Box sx={{ mt: "15px", width: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              views={["year", "month", "day", "hours", "minutes"]}
              ampm={false}
              openTo="month"
              minDate={dayjs(new Date())}
              maxDate={dayjs("2030-12-31")}
              value={formik.values.time ? dayjs(formik.values.time) : null}
              onChange={(newValue) => {
                if (newValue) {
                  const formattedDate = dayjs(newValue).format(
                    "YYYY-MM-DDTHH:mm:ssZ"
                  );
                  formik.setFieldValue("time", formattedDate);
                  formik.setFieldValue("groupID", groupID);
                } else {
                  formik.setFieldValue("time", "");
                }
              }}
              name="time"
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    "& .MuiInputBase-input": {
                      fontSize: "20px",
                      fontFamily: '"Schoolbell", cursive',
                    },
                    "& label.Mui-focused": {
                      color: "#000",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "18px",
                      fontFamily: '"Schoolbell", cursive',
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#2a2a2a",
                        borderWidth: "3px",
                      },
                      "&:hover fieldset": {
                        borderColor: "#2a2a2a",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2a2a2a",
                      },
                    },
                  },
                  size: "small",
                  onKeyDown: (event) => event.preventDefault(),
                  error: Boolean(formik.touched.time && formik.errors.time),
                  helperText: formik.touched.time && formik.errors.time,
                },
              }}
              label="Event Date & Time"
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          sx={{ fontFamily: "SchoolBell", fontSize: "22px" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Box sx={{ width: "140px" }}>
          <ConfirmBtn
            type="submit"
            text="Create"
            backgroundImage={successBtn.src}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}
