import { Item } from "./Item";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import { useSelector } from "react-redux";
import Link from "next/link";
import ProfileImage from "./ProfileImage";

export default function ContactsSection() {
  const suggestionsUsers = useSelector(
    (state: any) => state.suggestionsReducer.Users
  );

  return (
    <Item
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
      }}
      radius="8px"
    >
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {suggestionsUsers.map((suggestion: any) => {
          const labelId = `checkbox-list-secondary-label-${suggestion.ID}`;
          return (
            <Link href={`/profile/${suggestion.ID}`} key={suggestion.ID}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <ProfileImage
                      width={30}
                      height={30}
                      image={suggestion.image}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      ".MuiListItemText-primary": {
                        fontFamily: "Schoolbell, cursive",
                        fontSize: "19px",
                      },
                    }}
                    id={labelId}
                    primary={`${suggestion.firstName} ${suggestion.lastName}`}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Item>
  );
}
