"use client";

import { useState, useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "./getCookie";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import { fetchFromServer } from "@/lib/api";
import LoadingScreen from "@/components/shared/LoadingScreen";
import Login from "@/components/Login/index";
import Header from "@/components/Header";
import { Box } from "@mui/material";

export default function MainScreen({ children }: { children: ReactNode }) {
  const [showLoading, setShowLoading] = useState(true);
  const auth = useSelector((state: any) => state.authReducer.value.isAuth);
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const cookieVal = await getCookie();
        if (cookieVal) {
          const response = await fetchFromServer("/check-auth", {
            method: "GET",
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            dispatch(
              loginSuccess({
                id: data.id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                nickname: data.nickname,
                birthday: data.birthday,
                country: data.country,
              })
            );
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setAuthChecked(true);
        setTimeout(() => {
          setShowLoading(false);
        }, 500);
      }
    }
    fetchData();
  }, [dispatch]);

  if (showLoading) {
    return <LoadingScreen />;
  }

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
        {authChecked &&
          (auth ? (
            children
          ) : (
            <Login showLoading={showLoading} setShowLoading={setShowLoading} />
          ))}
      </Box>
    </>
  );
}
