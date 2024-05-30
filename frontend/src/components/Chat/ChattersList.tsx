import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon, Typography } from "@mui/material";
import ProfileImage from "../shared/ProfileImage";
import { ContactsProps } from "@/types/types";
import { useSelector } from "react-redux";

interface ChattersListProps {
  content: string;
  chatters: ContactsProps[];
  setReceiverID: React.Dispatch<number>;
  setActiveChatName: React.Dispatch<string>;
}

export default function ChattersList({
  content,
  chatters,
  setReceiverID,
  setActiveChatName,
}: ChattersListProps) {
  const handleClick = (chatterID: number, chatName: string) => {
    setReceiverID(chatterID);
    setActiveChatName(chatName);
  };

  return (
    <List aria-label="contacts">
      {chatters.map((chatter) => (
        <ListItem
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
