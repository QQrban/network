"use client";

import Header from "@/components/Header";
import Login from "@/components/Login/index";
import { Logo } from "@/components/Logo";
import NavigationMenu from "@/components/NavigationMenu";
import { Item } from "@/components/shared/Item";
import { Box } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

export default function MainScreen({ children }: { children: ReactNode }) {
  const auth = useSelector((state: any) => state.authReducer.value.isAuth);

  return (
    <Box>
      <Link href="/">
        <Logo />
      </Link>
      {auth ? <NavigationMenu /> : ""}
      <Item
        radius="18px"
        sx={{
          position: "relative",
          width: "calc(100% - 146px)",
          height: "calc(100vh - 46px)",
          m: "23px 23px 0 123px",
          background: "#F5F9FC",
          overflowY: "scroll",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {auth ? <Header /> : ""}
        <Box
          sx={{
            height: "100%",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "4px",
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          }}
        >
          {auth ? children : <Login />}
        </Box>
      </Item>
    </Box>
  );
}
