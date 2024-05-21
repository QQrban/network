import { Box, InputBase, IconButton } from "@mui/material";
import Image from "next/image";
import searchIcon from "../../../public/icons/search.svg";
import { fetchFromServer } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";

interface AllGroups {
  id: number;
  title: string;
  image: string | null;
}

export default function SearchBar() {
  const [searchText, setSearchText] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const [allGroups, setAllGroups] = useState<AllGroups[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<AllGroups[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const getAllGroups = await fetchFromServer("/groups", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allGroupsData = await getAllGroups.json();
      const groups: AllGroups[] = allGroupsData.map((group: any) => ({
        id: group.ID,
        title: group.title,
        image: group.image || null,
      }));
      setAllGroups(groups);
    };
    fetchPeople();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchText) {
        setSearching(true);
        const filtered = allGroups.filter((group) =>
          `${group.title}`.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredGroups(filtered);
      } else {
        setFilteredGroups([]);
        setSearching(false);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText, allGroups]);

  const clickedLink = () => {
    setSearchText("");
    setSearching(false);
    setFilteredGroups([]);
  };
  return (
    <Box
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        border: "2px solid #4a4a4a",
        borderRadius: "16px",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <Image
          style={{ width: "25px", height: "25px" }}
          src={searchIcon}
          alt="search"
        />
      </IconButton>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          fontFamily: "Schoolbell",
          fontSize: "21px",
          background: "white",
        }}
        placeholder="Search for Groups"
        inputProps={{ "aria-label": "search groups" }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searching && (
        <Box
          sx={{
            borderRadius: "0 0 10px 10px",
            background: "white",
            position: "absolute",
            width: 300,
            height: 150,
            overflowY: "scroll",
            border: "2px solid #4b4b4b",
            borderTop: "none",
            top: 235,
            left: 144,
            padding: "10px",
            zIndex: 1,
          }}
        >
          {filteredGroups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <Box
                onClick={clickedLink}
                sx={{
                  fontSize: "20px",
                  "&:hover": {
                    background: "#dedede",
                  },
                  zIndex: 2,
                }}
              >
                {group.title}
              </Box>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
}
