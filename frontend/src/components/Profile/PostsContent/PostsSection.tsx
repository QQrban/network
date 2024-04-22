import { Item } from "@/components/shared/Item";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../../public/Nophoto.jpg";

export default function PostsSection() {
  return (
    <Item
      sx={{
        mt: "23px",
      }}
      radius="8px"
    >
      <Box
        sx={{
          p: "10px 17px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Box
          sx={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
          }}
        >
          <Image src={noPhoto} alt="" />
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#2a2a2a",
            }}
          >
            Kurban Ramazanov
          </Typography>
          <Typography
            sx={{
              color: "#BEBEBE",
              fontSize: "11px",
            }}
          >
            April 16, 2024
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          p: "10px 17px",
        }}
      >
        <Typography>
          I will be volunteering over the next month, cleaning up the mountains!
        </Typography>
      </Box>
    </Item>
  );
}
