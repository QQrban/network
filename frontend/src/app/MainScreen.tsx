"use client";

import Header from "@/components/Header";
import Login from "@/components/Login/index";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

export default function MainScreen({ children }: { children: ReactNode }) {
  const auth = useSelector((state: any) => state.authReducer.value.isAuth);

  return (
    <>
      {auth ? <Header /> : ""}
      <Box
        sx={{
          position: "relative",
          background: "#F5F9FC",
          width: "1300px",
          m: "0 auto",
        }}
      >
        {auth ? children : <Login />}
      </Box>
    </>
  );
}
