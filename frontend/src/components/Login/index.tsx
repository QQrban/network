import { useState } from "react";

import { Box, Typography } from "@mui/material";

import BigLogo from "../shared/BigLogo";
import LoginContent from "./LoginContent";
import LoadingScreen from "../shared/LoadingScreen";
import RegisterContent from "./Register/RegisterContent";

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
        gap: "60px",
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
