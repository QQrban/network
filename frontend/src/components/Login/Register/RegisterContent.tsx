"use client";

import {
  Autocomplete,
  Box,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import { countries } from "../constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AvatarUpload from "../AvatarUpload";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { validationSchema } from "./validation";
import { useState } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  about: string;
  dateOfBirth: null;
  [key: string]: any;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  country: "",
  email: "",
  password: "",
  confirmPassword: "",
  about: "",
  dateOfBirth: null,
};

export default function RegisterContent() {
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();

        if (avatar) {
          formData.append("avatar", avatar);
        }

        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value.toString());
        });

        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        });

        if (response.ok) {
          resetForm();
          console.log("User registered successfully");
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography sx={{ textAlign: "center" }} variant="h4" component="h3">
        Sign Up
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <AvatarUpload onChange={handleFileChange} />
        <Box
          sx={{
            display: "flex",
            gap: "18px",
          }}
        >
          <TextField
            size="small"
            name="firstName"
            id="firstName"
            label="First Name"
            type="text"
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            size="small"
            name="lastName"
            id="lastName"
            label="Last Name"
            type="text"
            variant="outlined"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Box>
        <Autocomplete
          size="small"
          options={countries}
          autoHighlight
          onChange={(event, value) => {
            formik.setFieldValue("country", value?.label);
          }}
          renderOption={(renderProps, option) => (
            <Box
              {...renderProps}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              key={option.code}
            >
              {option.label} ({option.code}) +{option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            minDate={dayjs("1915-01-01")}
            maxDate={dayjs("2016-12-31")}
            format="MM/DD/YYYY"
            value={formik.values.dateOfBirth}
            onChange={(newValue) => {
              if (newValue && dayjs(newValue).isValid()) {
                formik.setFieldValue("dateOfBirth", newValue);
              }
            }}
            name="dateOfBirth"
            slotProps={{
              textField: {
                size: "small",
                onKeyDown: (event) => event.preventDefault(),
                error:
                  formik.touched.dateOfBirth &&
                  Boolean(formik.errors.dateOfBirth),
                helperText:
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth,
              },
            }}
            label="Date Of Birth"
          />
        </LocalizationProvider>
        <TextField
          size="small"
          name="email"
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          size="small"
          name="password"
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          size="small"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <StyledTextArea
          minRows={3}
          maxRows={6}
          maxLength={600}
          name="about"
          aria-label="empty textarea"
          placeholder="About you (optional)"
          value={formik.values.about}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Box>
      <Button
        type="submit"
        sx={{
          width: "100%",
          height: "50px",
          marginTop: "18px",
        }}
        variant="contained"
        color="success"
      >
        Sign Up
      </Button>
    </form>
  );
}

export const StyledTextArea = styled(TextareaAutosize)(
  () => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  resize: none;
  line-height: 1.5;
  padding: 6px 12px;
  border-radius: 4px;
  color: #1C2025;
  background: #fff;
  font-size: 16px;
  border: 1px solid #0000004b;
  box-shadow: 0px 2px 2px #F3F6F9;
  &:hover {
    border-color: #000;
  }
  &:focus {
    border-color: #3399FF;
    box-shadow: 0 0 0 1px #2c387e;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
