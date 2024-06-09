import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import { ContactsProps } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchFromServer } from "@/lib/api";
import { useSelector } from "react-redux";
import ProfileImage from "../ProfileImage";
import { Typography } from "@mui/material";

interface SelectSpecificFollowersProps {
  openSpecificFollowers: boolean;
  setOpenSpecificFollowers: React.Dispatch<boolean>;
}

export default function SelectSpecificFollowers({
  openSpecificFollowers,
  setOpenSpecificFollowers,
}: SelectSpecificFollowersProps) {
  const [checked, setChecked] = useState([1]);
  const [followersList, setFollowersList] = useState<ContactsProps[]>([]);

  const authID = useSelector((state: any) => state.authReducer.value.id);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetchFromServer(`/user/${authID}/followers`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setFollowersList(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFollowers();
  }, [authID]);

  return (
    <List
      dense
      sx={{
        border: "1px solid #b0b0b0",
        height: "200px",
        overflowY: "scroll",
        p: 0,
        bgcolor: "background.paper",
        display: openSpecificFollowers ? "block" : "none",
      }}
    >
      <Typography sx={{ p: "5px 5px 5px 17px", fontSize: "19px" }}>
        Followers
      </Typography>
      {followersList.length > 0
        ? followersList.map((follower, index) => (
            <ListItem
              key={follower.ID}
              onClick={handleToggle(follower.ID)}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(follower.ID)}
                  checked={checked.indexOf(follower.ID) !== -1}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <ProfileImage width={30} height={30} image={follower.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${follower.firstName} ${follower.lastName}`}
                />
              </ListItemButton>
            </ListItem>
          ))
        : "You have no followers yet!"}
    </List>
  );
}
