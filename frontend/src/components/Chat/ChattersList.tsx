import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon, Typography } from "@mui/material";
import ProfileImage from "../shared/ProfileImage";
import { ContactsProps } from "@/types/types";

interface ChattersListProps {
  content: string;
  chatters: ContactsProps[];
  receiverID: number | undefined;
  handleClick: (chatterID: number, chatName: string) => void;
}

export default function ChattersList({
  content,
  chatters,
  handleClick,
  receiverID,
}: ChattersListProps) {
  return (
    <List aria-label="contacts">
      {chatters.map((chatter) => (
        <ListItem
          sx={{
            outline: receiverID === chatter.ID ? "2px solid #b0b0b0" : null,
          }}
          onClick={() =>
            handleClick(chatter.ID, `${chatter.firstName} ${chatter.lastName}`)
          }
          key={chatter.ID}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <ProfileImage width={40} height={40} image="" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontFamily: "Gloria Hallelujah !important" }}>
                  {content === "private" ? (
                    <>
                      {chatter.firstName} {chatter.lastName}
                    </>
                  ) : (
                    "Groupname"
                  )}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
