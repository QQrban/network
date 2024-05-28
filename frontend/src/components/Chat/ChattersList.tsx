import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Item } from "../shared/Item";
import { ListItemIcon, Typography } from "@mui/material";
import ProfileAvatar from "../Profile/ProfileCard/ProfileAvatar";
import ProfileImage from "../shared/ProfileImage";

interface ChattersListProps {
  content: string;
}

export default function ChattersList({ content }: ChattersListProps) {
  return (
    <List aria-label="contacts">
      <Item radius="8px">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ProfileImage width={40} height={40} image="" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontFamily: "Gloria Hallelujah !important" }}>
                  {content === "private" ? "Firstname Lastname" : "Groupname"}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </Item>
      {[0, 1, 2].map((s) => (
        <ListItem key={s} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ProfileImage width={40} height={40} image="" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontFamily: "Gloria Hallelujah !important" }}>
                  {content === "private" ? "Firstname Lastname" : "Groupname"}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
