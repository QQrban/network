import { Box } from "@mui/material";
import type { Metadata } from "next";
import "./global.css";
import { ReduxProvider } from "@/redux/provider";
import MainScreen from "./MainScreen";
import { WebSocketProvider } from "@/context/WebSocketContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
export const metadata: Metadata = {
  title: "SketchSphere",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Box component="body">
        <AppRouterCacheProvider>
          <ReduxProvider>
            <WebSocketProvider>
              <MainScreen>{children}</MainScreen>
            </WebSocketProvider>
          </ReduxProvider>
        </AppRouterCacheProvider>
      </Box>
    </html>
  );
}
