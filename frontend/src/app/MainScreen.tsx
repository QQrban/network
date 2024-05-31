"use client";

import { useState, useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "./getCookie";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import { fetchFromServer } from "@/lib/api";
import LoadingScreen from "@/components/shared/LoadingScreen";
import Login from "@/components/Login/index";
import Header from "@/components/Header";
import NavigationMenu from "@/components/NavigationMenu";
import { Item } from "@/components/shared/Item";
import { Box } from "@mui/material";
import bgWall from "../../public/icons/wall.svg";
import { setSuggestions } from "@/redux/features/suggestions/suggestionsSlice";
import {
  addNewMessage,
  setNewNotification,
} from "@/redux/features/notifications/notificationsSlice";
import { usePathname } from "next/navigation";

export default function MainScreen({ children }: { children: ReactNode }) {
  const [showLoading, setShowLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  const auth = useSelector((state: any) => state.authReducer.value.isAuth);
  const dispatch = useDispatch();

  const pathname = usePathname();

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
                id: data.ID,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                nickname: data.nickname,
                birthday: data.birthday,
                image: data.image,
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

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (auth) {
        const response = await fetchFromServer("/suggestions", {
          credentials: "include",
        });
        const data = await response.json();
        dispatch(setSuggestions(data));
      }
    };
    fetchSuggestions();
  }, [auth, dispatch]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8888/ws");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = async (event) => {
      if (!pathname.includes("chat")) {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "message_personal") {
            dispatch(addNewMessage({ senderId: data.payload.senderID }));
          } else if (data.type === "notification") {
            dispatch(setNewNotification(true));
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [dispatch, pathname]);

  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {auth && <NavigationMenu />}
      <Item
        radius="8px"
        sx={{
          border: "4px solid #4a4a4a",
          backgroundImage: `url(${bgWall.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "calc(100vh - 40px)",
          m: "0 auto",
          overflowX: "none",
          overflowY: "scroll",
          pb: "23px",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#b0b0b0",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#ccc",
          },
        }}
      >
        {auth ? <Header /> : ""}
        {authChecked &&
          (auth ? (
            children
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Login
                showLoading={showLoading}
                setShowLoading={setShowLoading}
              />
            </Box>
          ))}
      </Item>
    </>
  );
}
