import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent } from "react";

interface ChatTabsProps {
  tabValue: string;
  setTabValue: React.Dispatch<React.SetStateAction<string>>;
  resetChatState: () => void;
}

export default function ChatTabs({
  tabValue,
  setTabValue,
  resetChatState,
}: ChatTabsProps) {
  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    resetChatState();
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab
          value="private"
          label={
            <Typography sx={{ fontFamily: "SchoolBell !important" }}>
              Private Chats
            </Typography>
          }
        />
        <Tab
          value="group"
          label={
            <Typography sx={{ fontFamily: "SchoolBell !important" }}>
              Group Chats
            </Typography>
          }
        />
      </Tabs>
    </Box>
  );
}
