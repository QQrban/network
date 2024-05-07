import { Box, Button, Divider, Typography } from "@mui/material";
import BigLogo from "../shared/BigLogo";
import googleLogo from "../../../public/icons/google.svg";
import Image from "next/image";
import { useState } from "react";
import LoginContent from "./LoginContent";
import RegisterContent from "./Register/RegisterContent";
import LoadingScreen from "../shared/LoadingScreen";
import frame from "../../../public/icons/frame.svg";

interface LoginProps {
  showLoading: boolean;
  setShowLoading: React.Dispatch<boolean>;
}

export default function Login({ showLoading, setShowLoading }: LoginProps) {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "190px",
      }}
    >
      {isLoginPage ? <BigLogo /> : ""}
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",

            flexDirection: "column",
            gap: "10px",
            padding: "30px 50px",
            minWidth: "720px",
          }}
        >
          {isLoginPage ? (
            <LoginContent setShowLoading={setShowLoading} />
          ) : (
            <RegisterContent setShowLoading={setShowLoading} />
          )}
          <Divider sx={{ fontSize: "30px" }}>OR</Divider>
          <Button
            sx={{
              borderRadius: "8px",
              display: "flex",
              gap: "10px",
              border: "3px solid #2a2a2a",
            }}
          >
            <Image src={googleLogo} alt="google" />
            <Typography
              component="span"
              sx={{
                color: "#2A2A2A",
                textTransform: "capitalize",
                fontSize: "20px",
                fontFamily: "Schoolbell !important",
              }}
            >
              Continue with Google
            </Typography>
          </Button>
        </Box>
        <Typography
          sx={{
            fontSize: "26px",
            fontFamily: "SchoolBell !important",
          }}
        >
          {isLoginPage ? `First time here? ` : "Already with us? "}
          <Typography
            onClick={() => setIsLoginPage(!isLoginPage)}
            sx={{
              fontSize: "26px",
              color: "dodgerblue",
              cursor: "pointer",
              fontFamily: "SchoolBell !important",
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
