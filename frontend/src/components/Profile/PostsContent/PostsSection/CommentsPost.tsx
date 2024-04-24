import { Box, Typography } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../../../public/Nophoto.jpg";

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
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            Denzel Washington
          </Typography>
          <Typography
            sx={{
              color: "#AEAEAE",
              fontSize: "11px",
            }}
          >
            actor, producer, and director
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          m: "9px 0 0 38px",
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
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
          <Typography fontSize={13}>5d</Typography>
          <Typography fontSize={13}>Like</Typography>
          <Typography fontSize={13}>Reply</Typography>
        </Box>
      </Box>
    </Box>
  );
}
