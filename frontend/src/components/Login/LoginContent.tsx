import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import { fetchFromServer } from "@/lib/api";
import { StyledTextField } from "./styles";
import { SuccessBtn } from "../shared/styles";

interface LoginProps {
  setShowLoading: React.Dispatch<boolean>;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginContent({ setShowLoading }: LoginProps) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        setShowLoading(true);
        const response = await fetchFromServer("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        });

        if (response.ok) {
          setTimeout(() => {
            window.location.reload();
          }, 300);
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
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
          fontFamily: "Schoolbell",
          color: "dodgerblue",
          textAlign: "center",
          fontSize: "80px",
        }}
        variant="h2"
        component="h3"
      >
        Sign In
      </Typography>
      <Box
        sx={{
          mt: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <StyledTextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="outlined"
        />
        <StyledTextField
          sx={{ mt: "15px" }}
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          variant="outlined"
        />
        <SuccessBtn type="submit">Log In</SuccessBtn>
      </Box>
    </form>
  );
}
