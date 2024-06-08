import { Box, Typography } from "@mui/material";
import { CommentProps } from "@/types/types";
import dayjs from "dayjs";
import ProfileImage from "../ProfileImage";
import Link from "next/link";
import PostImage from "./PostImage";
import { useState } from "react";
import PostImageDialog from "./PostImageDialog";

interface CommentPostProps {
  comments: CommentProps[];
}

export default function CommentsPost({ comments }: CommentPostProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleClickOpen = (image: string) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

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
            <Link href={`/profile/${comment.authorID}`}>
              <ProfileImage
                image={comment.author.image}
                width={36}
                height={36}
              />
            </Link>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <Link href={`/profile/${comment.authorID}`}>
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
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              m: "0 0 0 42px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
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
            {comment.images && (
              <Box sx={{ overflow: "hidden" }}>
                <PostImage
                  image={comment.images}
                  width="150px"
                  height="100px"
                  onClick={() => handleClickOpen(comment.images)}
                />
              </Box>
            )}
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
      <PostImageDialog
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
      />
    </>
  );
}
