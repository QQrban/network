"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Item } from "@/components/shared/Item";
import GroupItem from "@/components/Groups/GroupItem";
import { Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import SearchBar from "@/components/Groups/SearchBar";
import SuggestionsGroups from "@/components/shared/SuggestionsGroups";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Groups() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Item radius="8px">
        <Box
          sx={{
            p: "8px 12px 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Your Groups" {...a11yProps(0)} />
            <Tab label="Discover" {...a11yProps(1)} />
          </Tabs>
          <Button
            sx={{
              textTransform: "capitalize",
            }}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Create Group
          </Button>
        </Box>
        <Box
          sx={{
            p: "16px 0 0 16px",
          }}
        >
          <SearchBar />
        </Box>
        <CustomTabPanel value={value} index={0}>
          <GroupItem
            icon={LogoutIcon}
            title="Ctrl + Alt + Delete Club"
            members={57982}
            iconLabel="LEAVE GROUP"
          />
          <Divider />
          <GroupItem
            icon={LogoutIcon}
            title="Ctrl + Alt + Delete Club"
            members={57982}
            iconLabel="LEAVE GROUP"
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <GroupItem
            icon={LoginIcon}
            title="FOR JS!"
            members={8796}
            iconLabel="JOIN GROUP"
          />
          <Divider />
          <GroupItem
            icon={LoginIcon}
            title="Python Maniacs"
            members={22901}
            iconLabel="JOIN GROUP"
          />
        </CustomTabPanel>
      </Item>
      <SuggestionsGroups />
    </Box>
  );
}
