"use client";

import Login from "@/components/Login/index";
import NavigationMenu from "@/components/NavigationMenu";
import { Item } from "@/components/shared/Item";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

export default function MainScreen({ children }: { children: ReactNode }) {
  const auth = useSelector((state: any) => state.authReducer.value.isAuth);

  return (
    <Box>
      {auth ? <NavigationMenu /> : ""}
      <Item
        radius="18px"
        sx={{
          position: "relative",
          width: "calc(100% - 146px)",
          height: "calc(100vh - 46px)",
          m: "23px 23px 0 123px",
        }}
      >
        {auth ? children : <Login />}
      </Item>
    </Box>
  );
}
