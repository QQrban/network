import { Box, Divider, Typography } from "@mui/material";
import noPhoto from "../../../public/Nophoto.jpg";
import mediaIcon from "../../../public/icons/media.svg";
import feelingsIcon from "../../../public/icons/feelings.svg";
import locationIcon from "../../../public/icons/location.svg";
import tagFriendIcon from "../../../public/icons/tagFriend.svg";
import Image, { StaticImageData } from "next/image";
import { Item } from "@/components/shared/Item";

interface PostItem {
  icon: StaticImageData;
  name: string;
}

const createPostItems: PostItem[] = [
  {
    icon: mediaIcon,
    name: "Media",
  },
  {
    icon: feelingsIcon,
    name: "Feelings",
  },
  {
    icon: locationIcon,
    name: "Location",
  },
  {
    icon: tagFriendIcon,
    name: "Tag Friend",
  },
];

export default function CreatePost() {
  return (
    <Item radius="8px">
      <Box
        sx={{
          p: "10px 15px",
          display: "flex",
          alignItems: "center",
          gap: "11px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
          }}
        >
          <Image src={noPhoto} alt="no prof pic" />
        </Box>
        <Typography
          sx={{
            color: "#A6A6A6",
            fontSize: "16px",
          }}
        >
          Share your thoughts...
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: "10px 17px",
        }}
      >
        {createPostItems.map((item) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            key={item.name}
          >
            <Image src={item.icon} alt={item.name} />
            <Typography
              sx={{
                color: "#A7A7A7",
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Item>
  );
}
