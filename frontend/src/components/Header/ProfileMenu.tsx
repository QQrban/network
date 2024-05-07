"use client";

import Link from "next/link";
import TooltipStyled from "../shared/TooltipStyled";
import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { fetchFromServer } from "@/lib/api";
import profileSvg from "../../../public/icons/profile.svg";
import Image from "next/image";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  let id: number = 10561654311;

  const handleLogout = async () => {
    const response = await fetchFromServer("/logout", {
      method: "GET",
      credentials: "include",
    });
    console.log(response);

    if (response.ok) {
      handleClose();
      window.location.reload();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TooltipStyled title="Profile">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Image
            style={{ width: "42px", height: "42px" }}
            src={profileSvg}
            alt="Profile"
          />
        </IconButton>
      </TooltipStyled>
      <Menu
        sx={{
          "& .MuiPaper-root": {
            border: "2px solid #4a4a4a",
            borderRadius: "8px",
            boxShadow: "none",
          },
          zIndex: 9999,
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Link href={`/profile/${id}`}>
          <MenuItem
            sx={{
              fontFamily: "Schoolbell, cursive",
              fontSize: "18px",
            }}
            onClick={handleClose}
          >
            Profile
          </MenuItem>
        </Link>
        <MenuItem
          sx={{
            fontFamily: "Schoolbell, cursive",
            fontSize: "18px",
          }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
