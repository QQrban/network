import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon, Typography } from "@mui/material";
import ProfileImage from "../shared/ProfileImage";
import { ContactsProps, GroupProps } from "@/types/types";
import { useSelector } from "react-redux";
import Image from "next/image";
import attentionIcon from "../../../public/icons/attention.svg";

interface ChattersListProps {
  tabValue: string;
  content: string;
  chatters: ContactsProps[];
  groups: GroupProps[];
  receiverID: number | undefined;
  groupID: number;
  handleClick: (chatterID: number, chatName: string) => void;
  handleGroupClick: (groupID: number, groupChatName: string) => void;
}

export default function ChattersList({
  tabValue,
  content,
  chatters,
  handleClick,
  handleGroupClick,
  groups,
  receiverID,
  groupID,
}: ChattersListProps) {
  const newMessageSenderIds = useSelector(
    (state: any) => state.notificationsReducer.senderIds
  );

  return (
    <List aria-label="contacts">
      {tabValue === "private"
        ? chatters.map((chatter) => (
            <ListItem
              sx={{
                outline: receiverID === chatter.ID ? "2px solid #b0b0b0" : null,
              }}
              onClick={() =>
                handleClick(
                  chatter.ID,
                  `${chatter.firstName} ${chatter.lastName}`
                )
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
                    <Typography
                      sx={{ fontFamily: "Gloria Hallelujah !important" }}
                    >
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
                {newMessageSenderIds.includes(chatter.ID) && (
                  <Image
                    width={30}
                    height={30}
                    src={attentionIcon}
                    alt="new message"
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))
        : groups.map((group) => (
            <ListItem
              sx={{
                outline: groupID === group.ID ? "2px solid #b0b0b0" : null,
              }}
              onClick={() => handleGroupClick(group.ID, `${group.title}`)}
              key={group.ID}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <ProfileImage width={40} height={40} image="" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ fontFamily: "Gloria Hallelujah !important" }}
                    >
                      {group.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
    </List>
  );
}
