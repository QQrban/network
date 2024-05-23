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

interface CreateEventModalProps {
  openEventModal: boolean;
  setOpenEventModal: React.Dispatch<boolean>;
  pathName: string | undefined;
}

interface FormValues {
  title: string;
  description: string;
  groupID: number;
  eventDateTime: string | null;
}

const initialValues: FormValues = {
  title: "",
  description: "",
  groupID: 0,
  eventDateTime: null,
};

const validationSchema = Yup.object({
  title: Yup.string().min(10).required("Required field"),
  description: Yup.string().min(40).required("Required field"),
  eventDateTime: Yup.string().required("Required field"),
});

export default function CreateEventModal({
  openEventModal,
  setOpenEventModal,
  pathName,
}: CreateEventModalProps) {
  const handleClose = () => {
    setOpenEventModal(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      // try {
      //   const response = await fetchFromServer("/event", {
      //     method: "PUT",
      //     credentials: "include",
      //     body: JSON.stringify(values),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   if (response.ok) {
      //     resetForm();
      //     setOpenEventModal(false);
      //   } else {
      //     console.error("Registration failed");
      //   }
      // } catch (error) {
      //   console.error("Error during form submission:", error);
      // }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
                value={
                  formik.values.eventDateTime
                    ? dayjs(formik.values.eventDateTime)
                    : null
                }
                onChange={(newValue) => {
                  if (newValue) {
                    const formattedDate = dayjs(newValue).format(
                      "YYYY-MM-DDTHH:mm:ssZ"
                    );
                    formik.setFieldValue("eventDateTime", formattedDate);
                  }
                }}
                name="eventDateTime"
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
                    error: Boolean(formik.touched.eventDateTime),
                    helperText:
                      formik.touched.eventDateTime &&
                      formik.errors.eventDateTime,
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
    </form>
  );
}
