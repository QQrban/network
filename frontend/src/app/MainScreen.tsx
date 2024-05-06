"use client";

import Header from "@/components/Header";
import Login from "@/components/Login/index";
import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "./getCookie";
import { loginSuccess } from "@/redux/features/auth/authSlice";

export default function MainScreen({ children }: { children: ReactNode }) {
  const auth = useSelector((state: any) => state.authReducer.value.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const cookieVal = await getCookie();
      if (cookieVal) dispatch(loginSuccess(""));
    };
    fetchData();
  }, [dispatch]);

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
