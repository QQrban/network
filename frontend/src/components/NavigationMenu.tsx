"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TooltipStyled from "./shared/TooltipStyled";
import homeIcon from "../../public/icons/home.svg";
import contactsIcon from "../../public/icons/contacts.svg";
import groupsIcon from "../../public/icons/groups.svg";
import eventsIcon from "../../public/icons/calendar.svg";
import arrowIcon from "../../public/icons/rightarrow.svg";
import Image from "next/image";

interface ActiveLabelProps {
  isActive: boolean;
}

export default function NavigationMenu() {
  const matchesSM = useMediaQuery("(min-width:613px)");
  const matchesXS = useMediaQuery("(min-width:414px)");

  const pathname = usePathname();
  const isActive = (currentPath: String, targetPath: String) =>
    currentPath === targetPath;

  const ActiveLabel = ({ isActive }: ActiveLabelProps) => {
    return isActive && matchesSM ? (
      <Box
        sx={{
          position: "absolute",
          left: "-15px",
          top: "-40px",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            fontFamily: "Gloria Hallelujah !important",
            width: "90px",
          }}
        >
          You are here
        </Typography>
        <Image
          style={{ transform: "rotate(90deg)", width: "40px" }}
          src={arrowIcon}
          alt="arrow"
        />
      </Box>
    ) : null;
  };

  return (
    <Box
      sx={{
        position: "absolute",
        left: matchesSM ? "23px" : "",
        justifyContent: "center",
        top: matchesSM ? "50%" : "unset",
        bottom: matchesSM ? "unset" : "14px",
        transform: matchesSM ? "translateY(-50%)" : "",
        display: "flex",
        width: matchesSM ? "unset" : "calc(100% - 40px)",
        flexDirection: matchesSM ? "column" : "row",
        gap: matchesSM ? "90px" : "40px",
      }}
      component="nav"
    >
      {["/", "/contacts", "/events", "/groups"].map((path, index) => (
        <TooltipStyled
          key={index}
          title={
            path === "/"
              ? "Home"
              : path.substring(1).charAt(0).toUpperCase() + path.substring(2)
          }
        >
          <Box
            sx={{ position: "relative", flexShrink: matchesXS ? 0 : "unset" }}
          >
            <Link href={path} passHref>
              <Image
                src={
                  path === "/"
                    ? homeIcon
                    : path === "/contacts"
                    ? contactsIcon
                    : path === "/events"
                    ? eventsIcon
                    : groupsIcon
                }
                alt={path.substring(1)}
              />
              <ActiveLabel isActive={isActive(pathname, path)} />
            </Link>
          </Box>
        </TooltipStyled>
      ))}
    </Box>
  );
}
