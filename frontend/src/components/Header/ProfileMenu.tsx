"use client";

import Link from "next/link";
import TooltipStyled from "../shared/TooltipStyled";
import { useState } from "react";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { fetchFromServer } from "@/lib/api";
import { useSelector } from "react-redux";
import ProfileImage from "../shared/ProfileImage";
import HeaderMenu from "./HeaderMenu";

export default function ProfileMenu() {
  const matchesMD = useMediaQuery("(min-width:813px)");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const auth = useSelector((state: any) => state.authReducer.value);
  const id = auth.id;

  const senderIds = useSelector(
    (state: any) => state.notificationsReducer.senderIds
  );
  const groupIds = useSelector(
    (state: any) => state.notificationsReducer.groupIds
  );
  const hasNewNotification = useSelector(
    (state: any) => state.notificationsReducer.hasNewNotification
  );
  const hasNewMessage = senderIds.length > 0 || groupIds.length > 0;

  const handleLogout = async () => {
    const response = await fetchFromServer("/logout", {
      method: "GET",
      credentials: "include",
    });

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
        {matchesMD ? (
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ProfileImage width={50} height={50} image={auth.image} />
          </IconButton>
        ) : (
          <Badge
            badgeContent={hasNewMessage || hasNewNotification ? "!" : 0}
            color="error"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                transform: "translate(0%, -10%) scale(1)",
              },
            }}
          >
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <ProfileImage width={50} height={50} image={auth.image} />
            </IconButton>
          </Badge>
        )}
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
        {!matchesMD && (
          <>
            <Link href="/chat">
              <MenuItem
                sx={{
                  fontFamily: "Schoolbell, cursive",
                  fontSize: "18px",
                }}
                onClick={handleClose}
              >
                <Badge
                  variant="dot"
                  badgeContent={hasNewMessage ? "!" : 0}
                  color="error"
                >
                  Messenger
                </Badge>
              </MenuItem>
            </Link>
            <Link href="/notifications">
              <MenuItem
                sx={{
                  fontFamily: "Schoolbell, cursive",
                  fontSize: "18px",
                }}
                onClick={handleClose}
              >
                <Badge
                  variant="dot"
                  badgeContent={hasNewNotification ? "!" : 0}
                  color="error"
                >
                  Notifications
                </Badge>
              </MenuItem>
            </Link>
          </>
        )}
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
