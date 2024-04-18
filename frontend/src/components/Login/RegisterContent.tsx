import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { countries } from "./constants";

export default function RegisterContent() {
  return (
    <>
      <Typography variant="h4" component="h3">
        Sign Up
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "18px",
          }}
        >
          <TextField
            required
            id="firstName"
            label="First Name"
            type="text"
            variant="outlined"
          />
          <TextField
            required
            id="lastName"
            label="Last Name"
            type="text"
            variant="outlined"
          />
        </Box>
        <Autocomplete
          id="country-select-demo"
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
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
        <TextField
          required
          id="email"
          label="Email"
          type="email"
          variant="outlined"
        />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          variant="outlined"
        />
        <TextField
          required
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
        />
      </Box>
      <Button
        sx={{ height: "50px", marginTop: "18px" }}
        variant="contained"
        color="success"
      >
        Sign Up
      </Button>
    </>
  );
}
