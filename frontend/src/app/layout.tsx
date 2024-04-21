import { Box } from "@mui/material";
import type { Metadata } from "next";
import "./global.css";
import { Roboto } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import { Logo } from "@/components/Logo";
import MainScreen from "./MainScreen";

export const metadata: Metadata = {
  title: "netWork",
  description: "Generated by create next app",
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Box
        className={roboto.className}
        sx={{
          height: "100vh",
          background: "#325187",
          overflow: "hidden",
        }}
        component="body"
      >
        <ReduxProvider>
          <MainScreen>{children}</MainScreen>
        </ReduxProvider>
      </Box>
    </html>
  );
}
