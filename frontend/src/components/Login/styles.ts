import { TextField, TextareaAutosize, styled } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    fontSize: "20px",
    fontFamily: '"Schoolbell", cursive',
  },
  "& .MuiInputLabel-root": {
    fontSize: "20px",
    fontFamily: '"Schoolbell", cursive',
  },
  ".css-1wc848c-MuiFormHelperText-root.Mui-error": {
    fontFamily: '"Comic Neue", cursive',
    fontSize: "13px",
  },
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "3px solid #2a2a2a",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2a2a2a",
      borderWidth: "3px",
    },
    "&:hover fieldset": {
      borderColor: "#2a2a2a",
      borderWidth: "3px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2a2a2a",
      borderWidth: "3px",
    },
  },
}));

export const StyledTextArea = styled(TextareaAutosize)(
  () => `
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-family: 'Schoolbell', cursive;
  resize: none;
  line-height: 1.5;
  padding: 6px 12px;
  border-radius: 4px;
  color: #1C2025;
  background: transparent;
  font-size: 20px;
  border: 3px solid #2a2a2a;
  box-shadow: 0px 2px 2px #F3F6F9;
  &:hover {
    border-color: #000;
  }
  &:focus {
    border-color: #2a2a2a;
    box-shadow: 0 0 0 1px #2a2a2a;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
