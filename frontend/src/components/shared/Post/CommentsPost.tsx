import { Box, Typography } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../../public/icons/profile.svg";
import { CommentProps } from "@/types/types";
import dayjs from "dayjs";
import ProfileImage from "../ProfileImage";

interface CommentPostProps {
  comments: CommentProps[];
}

export default function CommentsPost({ comments }: CommentPostProps) {

  return (
    <>
      {comments?.map((comment) => (
        <Box
          key={comment.ID}
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
            <ProfileImage image={comment.author.image} width={36} height={36} />
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
                {comment.author
                  ? `${comment.author.firstName} ${comment.author.lastName}`
                  : "Unknown Author"}
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
                wordBreak: "break-all",
              }}
            >
              {comment.content}
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
              <Typography fontSize={16}>
                {dayjs(comment.created).format("MMM D, YYYY")}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
}
