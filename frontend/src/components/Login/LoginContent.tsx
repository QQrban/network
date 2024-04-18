import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginContent() {
  return (
    <>
      <Typography variant="h4" component="h3">
        Sign In
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          sx={{
            width: "100%",
          }}
          id="email"
          label="Email"
          type="email"
          variant="outlined"
        />
        <TextField
          sx={{
            width: "100%",
          }}
          id="password"
          label="Password"
          type="password"
          variant="outlined"
        />
      </Box>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Remember Me"
      />
      <Button sx={{ height: "50px" }} variant="contained" color="success">
        Log In
      </Button>
    </>
  );
}
