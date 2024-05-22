import { Box, Typography } from "@mui/material";
import noPhoto from "../../../../public/icons/profile.svg";
import Image from "next/image";
import { Item } from "@/components/shared/Item";
import { useSelector } from "react-redux";
import Link from "next/link";

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              border: "2px solid #4a4a4a",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Image
              width={40}
              height={40}
              src={
                userData.image
                  ? `http://localhost:8888/file/${userData.image}`
                  : noPhoto
              }
              alt="no prof pic"
            />
          </Box>
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
