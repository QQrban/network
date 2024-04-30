"use client";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactsIcon from "@mui/icons-material/Contacts";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import { ElementType, useState } from "react";
import { Item } from "@/components/shared/Item";
import { Box, styled, SvgIconProps, Typography } from "@mui/material";
import {
  FollowersProps,
  followers,
  followings,
  suggestions,
  topContacts,
} from "@/components/Profile/ContactsContent/mock";
import FollowersSection from "@/components/shared/FollowersSection";

interface NavItemProps {
  icon: ElementType<SvgIconProps>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}
const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}) => {
  const ListItem = styled(ListItemButton)(({ theme }) => ({
    backgroundColor: isActive ? "#0000001e" : "transparent",
    "&:hover": {
      backgroundColor: "#00000014",
    },
  }));

  return (
    <ListItem
      sx={label === "Followers" || label === "Followings" ? { pl: 4 } : null}
      onClick={onClick}
    >
      <ListItemIcon>
        <Icon sx={{ transform: label === "Followers" ? "scaleX(-1)" : null }} />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
};

export default function Followers() {
  const [open, setOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("Suggestions");
  const [peopleList, setPeopleList] = useState<FollowersProps[]>(suggestions);

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Followers") {
      setPeopleList(followers);
    } else if (tab === "Followings") {
      setPeopleList(followings);
    } else if (tab === "Suggestions") {
      setPeopleList(suggestions);
    } else if (tab === "Favorite Contacts") {
      setPeopleList(topContacts);
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Item
        radius="0"
        sx={{
          position: "fixed",
          left: 0,
          height: "100vh",
          width: "280px",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              sx={{ fontSize: "23px" }}
              component="h4"
              id="nested-list-subheader"
            >
              Contacts
            </ListSubheader>
          }
        >
          <NavItem
            icon={ContactsIcon}
            label="Suggestions"
            isActive={activeTab === "Suggestions"}
            onClick={() => handleActiveTab("Suggestions")}
          />
          <NavItem
            icon={StarBorderIcon}
            label="Favorite Contacts"
            isActive={activeTab === "Favorite Contacts"}
            onClick={() => handleActiveTab("Favorite Contacts")}
          />
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavItem
                icon={FollowTheSignsIcon}
                label="Followers"
                isActive={activeTab === "Followers"}
                onClick={() => handleActiveTab("Followers")}
              />
              <NavItem
                icon={FollowTheSignsIcon}
                label="Followings"
                isActive={activeTab === "Followings"}
                onClick={() => handleActiveTab("Followings")}
              />
            </List>
          </Collapse>
        </List>
      </Item>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          p: "24px 0 0 210px",
        }}
      >
        {activeTab}
      </Typography>
      <Box
        sx={{
          padding: "30px 0 30px 120px",
          display: "flex",
          gap: "29px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FollowersSection activeTab={activeTab} peopleList={peopleList} />
      </Box>
    </Box>
  );
}