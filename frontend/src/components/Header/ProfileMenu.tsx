"use client";

import Link from "next/link";
import TooltipStyled from "../shared/TooltipStyled";
import { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { fetchFromServer } from "@/lib/api";

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
          <Avatar
            src="../../../public/Nophoto.jpg"
            sx={{ width: 42, height: 42 }}
          ></Avatar>
        </IconButton>
      </TooltipStyled>
      <Menu
        sx={{
          zIndex: 9999,
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href={`/profile/${id}`}>Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
