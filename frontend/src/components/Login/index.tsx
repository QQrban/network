import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import BigLogo from "./BigLogo";
import { Item } from "../shared/Item";
import googleLogo from "../../../public/icons/google.svg";
import Image from "next/image";
import { useState } from "react";
import LoginContent from "./LoginContent";
import RegisterContent from "./RegisterContent";

export default function Login() {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "190px",
      }}
    >
      {isLoginPage ? <BigLogo /> : ""}
      <Box>
        <Item
          radius="2px"
          sx={{
            borderTop: "1px solid #00000012",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "30px 50px",
            minWidth: "420px",
          }}
        >
          {isLoginPage ? <LoginContent /> : <RegisterContent />}
          <Divider>OR</Divider>
          <Button
            sx={{
              display: "flex",
              gap: "10px",
            }}
            variant="outlined"
          >
            <Image src={googleLogo} alt="google" />
            <Typography
              component="span"
              sx={{ color: "#2A2A2A", textTransform: "capitalize" }}
            >
              Continue with Google
            </Typography>
          </Button>
        </Item>
        <Typography sx={{ marginTop: "16px" }}>
          {isLoginPage ? `First time here? ` : "Already with us? "}
          <Typography
            onClick={() => setIsLoginPage(!isLoginPage)}
            sx={{
              color: "dodgerblue",
              cursor: "pointer",
              ":hover": {
                textDecoration: "underline",
              },
            }}
            component="span"
          >
            {isLoginPage ? `Join Now ` : "Sign In "}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
