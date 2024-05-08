import { Box, Typography } from "@mui/material";
import noPhoto from "../../../public/icons/profile.svg";
import Image from "next/image";
import { Item } from "@/components/shared/Item";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function CreatePost() {
  const userData = useSelector((state: any) => state.authReducer.value);

  return (
    <Item
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
              width: "30px",
              height: "30px",
              border: "2px solid #4a4a4a",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Image src={noPhoto} alt="no prof pic" />
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
