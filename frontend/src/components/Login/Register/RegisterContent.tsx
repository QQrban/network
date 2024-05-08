"use client";

import {
  Autocomplete,
  Box,
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
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import { fetchFromServer } from "@/lib/api";
import { StyledTextArea, StyledTextField } from "../styles";
import { SuccessBtn } from "@/components/shared/styles";

interface RegisterProps {
  setShowLoading: React.Dispatch<boolean>;
}

interface FormValues {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  password: string;
  nickname: string;
  confirmPassword: string;
  about: string;
  birthday: null;
  [key: string]: any;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  country: "",
  nickname: "",
  email: "",
  password: "",
  confirmPassword: "",
  about: "",
  birthday: null,
};

export default function RegisterContent({ setShowLoading }: RegisterProps) {
  const [avatar, setAvatar] = useState<string | null>(null);

  const dispatch = useDispatch();

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
        setShowLoading(true);
        const formData = new FormData();
        if (avatar) {
          formData.append("avatar", avatar);
        }

        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value.toString());
        });

        const response = await fetchFromServer("/register", {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(values),
        });
        if (response.ok) {
          resetForm();
          const data = await response.json();
          dispatch(
            loginSuccess({
              id: data.ID,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              nickname: data.nickname,
              birthday: data.birthday,
              country: data.country,
            })
          );
          console.log("User registered successfully");
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      } finally {
        setTimeout(() => {
          setShowLoading(false);
        }, 500);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "Schoolbell !important",
          color: "dodgerblue",
        }}
        variant="h2"
        component="h3"
      >
        Sign Up
      </Typography>
      <AvatarUpload onChange={handleFileChange} />
      <Box
        sx={{
          mt: "23px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "50%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "18px",
              }}
            >
              <StyledTextField
                size="small"
                name="firstName"
                id="firstName"
                label="First Name"
                type="text"
                variant="outlined"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <StyledTextField
                size="small"
                name="lastName"
                id="lastName"
                label="Last Name"
                type="text"
                variant="outlined"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Box>
            <StyledTextField
              size="small"
              name="nickname"
              id="nickname"
              label="Nickname"
              type="text"
              variant="outlined"
              value={formik.values.nickname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nickname && Boolean(formik.errors.nickname)}
              helperText={formik.touched.nickname && formik.errors.nickname}
            />
            <Autocomplete
              size="small"
              options={countries}
              getOptionLabel={(option) => option.name}
              filterOptions={(options, { inputValue }) =>
                options.filter(
                  (option) =>
                    option.name
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                    option.code.toLowerCase().includes(inputValue.toLowerCase())
                )
              }
              autoHighlight
              onChange={(event, value) => {
                formik.setFieldValue("country", value?.name);
              }}
              renderOption={(renderProps, option) => (
                <Box
                  {...renderProps}
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  key={option.code}
                >
                  {option.name} ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label="Country"
                  value={formik.values.country}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year", "month", "day"]}
                openTo="year"
                minDate={dayjs("1915-01-01")}
                maxDate={dayjs("2016-12-31")}
                value={dayjs(formik.values.birthday)}
                onChange={(newValue) => {
                  if (newValue) {
                    const formattedDate = dayjs(newValue).format(
                      "YYYY-MM-DDTHH:mm:ssZ"
                    );
                    formik.setFieldValue("birthday", formattedDate);
                  }
                }}
                name="birthday"
                slotProps={{
                  textField: {
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
                    error: Boolean(formik.touched.birthday),
                    helperText:
                      formik.touched.birthday && formik.errors.birthday,
                  },
                }}
                label="Birthday"
              />
            </LocalizationProvider>
            <StyledTextField
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
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "50%",
            }}
          >
            <StyledTextField
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
            <StyledTextField
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
              minRows={5}
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
        </Box>
      </Box>
      <SuccessBtn sx={{ mt: "13px" }} type="submit">
        Sign Up
      </SuccessBtn>
    </form>
  );
}
