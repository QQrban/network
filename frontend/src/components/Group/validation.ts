import * as Yup from "yup";

export const validationSchema = Yup.object({
  content: Yup.string()
    .required("Content is Required")
    .min(50, "Content must be at least 50 characters")
    .max(600, "Content must be at most 600 characters"),
});
