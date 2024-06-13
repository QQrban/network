import { Box, InputBase, IconButton, useMediaQuery } from "@mui/material";
import Image from "next/image";
import searchIcon from "../../../public/icons/search.svg";
import { fetchFromServer } from "@/lib/api";
import { useEffect, useState, useRef } from "react";
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
  const searchBoxRef = useRef<HTMLDivElement>(null);

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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target as Node)
    ) {
      setSearching(false);
      setFilteredGroups([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clickedLink = () => {
    setSearchText("");
    setSearching(false);
    setFilteredGroups([]);
  };

  const matchesSM = useMediaQuery("(min-width:750px)");

  return (
    <Box
      ref={searchBoxRef}
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: matchesSM ? "300px" : "100%",
        maxWidth: "300px",
        border: "2px solid #4a4a4a",
        borderRadius: searching ? "16px 16px 0 0" : "16px",
        position: "relative",
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
            width: matchesSM ? "300px" : "100%",
            maxWidth: "300px",
            height: 150,
            overflowY: "scroll",
            border: "2px solid #4b4b4b",
            borderTop: "none",
            top: 40,
            left: matchesSM ? "-2px" : "0px",
            padding: "10px",
            zIndex: 2,
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
