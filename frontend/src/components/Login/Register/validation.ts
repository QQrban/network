import * as Yup from "yup";
import dayjs from "dayjs";

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  country: Yup.string().required("Country is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  dateOfBirth: Yup.date()
    .nullable()
    .required("Please enter a complete and correct date")
    .test("dateOfBirth", "Please enter a valid date", (value) => {
      if (!value) {
        return false;
      }

      const dayjsDate = dayjs(value);
      return dayjsDate.isValid();
    }),
});
