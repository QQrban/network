import { Box, Typography } from "@mui/material";
import { Item } from "./Item";
import Image from "next/image";
import noPhoto from "../../../public/Nophoto.jpg";

export default function ContactsSection() {
  const friends: Array<string> = [
    "Johnny Bravo",
    "Albert Einstein",
    "Toomas Vooglaid",
    "Alexander Gustaffson",
    "Alex Volkanovski",
    "Kersti Kaljulaid",
  ];

  return (
    <Item
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "290px",
      }}
      radius="8px"
    >
      {friends?.map((friend, index) => (
        <Box
          key={index}
          sx={{
            p: "10px",
            display: "flex",
            alignItems: "center",
            gap: "11px",
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
          <Typography sx={{}}>{friend}</Typography>
        </Box>
      ))}
    </Item>
  );
}
