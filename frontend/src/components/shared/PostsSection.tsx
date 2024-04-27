import { Item } from "@/components/shared/Item";
import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../public/Nophoto.jpg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import ReactionToPost from "../Profile/MainBoard/PostsSection/ReactionToPost";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentsPost from "../Profile/MainBoard/PostsSection/CommentsPost";
import mockBg from "../../../public/mockBG.png";
import AddComment from "../Profile/MainBoard/PostsSection/AddComment";

export default function PostsSection() {
  const reactions: Array<string> = [
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
        mt: "13px",
        width: "600px",
      }}
      radius="8px"
    >
      <Box
        sx={{
          p: "10px 17px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
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
        <Button
          sx={{
            cursor: "pointer",
          }}
        >
          <MoreHorizIcon
            sx={{
              color: "#8F8F8F",
              fontSize: "35px",
            }}
          />
        </Button>
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
      <Box
        sx={{
          width: "100%",
          height: "200px",
          border: "1px solid grey",
          m: "0 auto",
          background: `url(${mockBg.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
      <Box
        sx={{
          p: "10px 17px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            bgcolor: "#6495ED",
            padding: "3px",
            borderRadius: "50%",
            width: "19px",
            height: "19px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThumbUpIcon sx={{ color: "#fff", fontSize: "14px" }} />
        </Box>
        <Typography
          sx={{
            color: "#8F8F8F",
            fontSize: "13px",
          }}
        >
          {`${reactions[0]} and ${reactions.length} others`}
        </Typography>
      </Box>
      <Divider />

      <Box
        sx={{
          p: "10px 17px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ReactionToPost
          icon={<ThumbUpIcon sx={{ color: "#8F8F8F" }} />}
          label="Like"
          onClick={() => console.log("Like")}
        />
        <ReactionToPost
          icon={<ChatBubbleIcon sx={{ color: "#8F8F8F" }} />}
          label="Comment"
          onClick={() => console.log("Comment")}
        />
        <ReactionToPost
          icon={<ShareIcon sx={{ color: "#8F8F8F" }} />}
          label="Share"
          onClick={() => console.log("Share")}
        />
      </Box>
      <Divider />
      <CommentsPost />
      <CommentsPost />
      <AddComment />
    </Item>
  );
}
