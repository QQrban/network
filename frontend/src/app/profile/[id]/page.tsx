import ProfileCard from "@/components/Profile/ProfileCard";
import { Item } from "@/components/shared/Item";
import { Box } from "@mui/material";

export default function ProfilePage() {
  return (
    <Box
      sx={{
        p: "19px 28px",
      }}
    >
      <Item
        sx={{
          overflow: "hidden",
        }}
        radius="8px"
      >
        <ProfileCard />
      </Item>
    </Box>
  );
}
