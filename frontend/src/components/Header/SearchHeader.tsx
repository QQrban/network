"use client";

import { IconButton, InputBase, Box, useMediaQuery } from "@mui/material";
import search from "../../../public/icons/search.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fetchFromServer } from "@/lib/api";
import Link from "next/link";

interface AllUsers {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
  image: string | null;
}

export default function SearchHeader() {
  const [searchText, setSearchText] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AllUsers[]>([]);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const matchesMD = useMediaQuery("(min-width:813px)");

  useEffect(() => {
    const fetchPeople = async () => {
      const getAllUsers = await fetchFromServer("/users", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allUsersData = await getAllUsers.json();
      const users: AllUsers[] = allUsersData.map((user: any) => ({
        id: user.ID,
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
        image: user.image || null,
      }));
      setAllUsers(users);
    };
    fetchPeople();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchText) {
        setSearching(true);
        const filtered = allUsers.filter(
          (user) =>
            `${user.firstName} ${user.lastName}`
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            user.nickname.toLowerCase().startsWith(searchText.toLowerCase())
        );
        setFilteredUsers(filtered);
      } else {
        setFilteredUsers([]);
        setSearching(false);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText, allUsers]);

  const clickedLink = () => {
    setSearchText("");
    setSearching(false);
    setFilteredUsers([]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target as Node)
    ) {
      setSearching(false);
      setFilteredUsers([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      ref={searchBoxRef}
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: matchesMD ? 300 : 200,
        height: 35,
        bgcolor: "transparent",
        border: "1px solid #4b4b4b",
        borderRadius: searching ? "10px 10px 0 0" : "10px",
        position: "relative",
      }}
    >
      <IconButton
        type="button"
        sx={{ p: "10px", pointerEvents: "none" }}
        aria-label="search"
      >
        <Image style={{ width: 25 }} src={search} alt="search" />
      </IconButton>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: "black",
          fontFamily: "Schoolbell",
          fontSize: "20px",
        }}
        placeholder="Look for people"
        inputProps={{ "aria-label": "search through the website" }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searching && (
        <Box
          sx={{
            borderRadius: "0 0 10px 10px",
            background: "white",
            position: "absolute",
            width: matchesMD ? 300 : 200,
            height: 150,
            overflowY: "scroll",
            border: "1px solid #4b4b4b",
            borderTop: "none",
            left: -1,
            top: 30,
            padding: "10px",
          }}
        >
          {filteredUsers.map((user) => (
            <Link key={user.id} href={`/profile/${user.id}`}>
              <Box
                onClick={clickedLink}
                sx={{
                  fontSize: "20px",
                  "&:hover": {
                    background: "#dedede",
                  },
                }}
              >
                {user.firstName} {user.lastName} {`(${user.nickname})`}
              </Box>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
}
