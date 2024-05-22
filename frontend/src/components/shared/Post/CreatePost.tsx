import { Box, Typography } from "@mui/material";
import noPhoto from "../../../../public/icons/profile.svg";
import Image from "next/image";
import { Item } from "@/components/shared/Item";
import { useSelector } from "react-redux";
import Link from "next/link";
import ProfileImage from "../ProfileImage";

interface CreatePostProps {
  setOpenPostModal: React.Dispatch<boolean>;
}

export default function CreatePost({ setOpenPostModal }: CreatePostProps) {
  const userData = useSelector((state: any) => state.authReducer.value);

  const openModal = () => {
    setOpenPostModal(true);
  };

  return (
    <Item
      onClick={openModal}
      sx={{
        ":hover": {
          opacity: 0.9,
          cursor: "pointer",
        },
      }}
      radius="8px"
    >
      <Box
        sx={{
          p: "10px 15px",
          display: "flex",
          alignItems: "center",
          gap: "11px",
        }}
      >
        <Link href={`/profile/${userData.id}`}>
          <ProfileImage width={40} height={40} image={userData.image} />
        </Link>
        <Typography
          sx={{
            color: "#A6A6A6",
            fontSize: "21px",
            fontFamily: "Schoolbell !important",
          }}
        >
          Share your thoughts...
        </Typography>
      </Box>
    </Item>
  );
}
