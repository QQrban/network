import { Box, Typography } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../../../public/icons/profile.svg";

export default function CommentsPost() {
  return (
    <Box
      sx={{
        p: "10px 17px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Box
          sx={{
            width: "36px",
            height: "36px",
            border: "2px solid #4a4a4a",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image src={noPhoto} alt="profile pic" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            Denzel Washington
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          m: "0 0 0 42px",
        }}
      >
        <Typography
          sx={{
            fontSize: "15px",
          }}
        >
          Good luck, Kurban! You&apos;re doing the right thing! If I manage to
          finish my tasks, I&apos;ll definitely join you too!
        </Typography>
        <Box
          sx={{
            mt: "9px",
            display: "flex",
            color: "#A9A9A9",
            fontSize: "11px",
            gap: "10px",
          }}
        >
          <Typography fontSize={16}>5d</Typography>
          <Typography fontSize={16}>Like</Typography>
        </Box>
      </Box>
    </Box>
  );
}
