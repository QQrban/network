import { Box, IconButton, styled } from "@mui/material";
import confirmBtn from "../../../../public/icons/confirmButton.svg";
import deleteIcon from "../../../../public/icons/delete.svg";
import mediaIcon from "../../../../public/icons/media.svg";
import { useState } from "react";
import ConfirmBtn from "@/components/shared/ConfirmBtn";
import { fetchFromServer } from "@/lib/api";
import { CommentProps } from "@/types/types";
import { useSelector } from "react-redux";
import ProfileImage from "../ProfileImage";
import { TextareaAutosize } from "../styles";
import Image from "next/image";

interface AddCommentProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  postID: number;
  addComment: (postID: number, comment: CommentProps) => void;
}

export default function AddComment({
  inputRef,
  postID,
  addComment,
}: AddCommentProps) {
  const [commentText, setCommentText] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const userImage = useSelector((state: any) => state.authReducer.value.image);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleAddComment = async () => {
    const formData = new FormData();
    formData.append("content", commentText);
    if (selectedImage) {
      formData.append("images", selectedImage);
    }

    try {
      const response = await fetchFromServer(`/post/${postID}/comment`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      console.log(response);

      if (response.ok) {
        const newComment: CommentProps = await response.json();
        addComment(postID, newComment);
        setCommentText("");
        setSelectedImage(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          p: "10px 17px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          position: "relative",
        }}
      >
        <ProfileImage width={35} height={35} image={userImage} />
        <Box
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          <TextareaAutosize
            ref={inputRef}
            maxLength={1250}
            aria-label="empty textarea"
            placeholder="Type something..."
            value={commentText}
            onChange={handleTextChange}
          />
          <IconButton sx={{ position: "absolute", right: "0", bottom: "3px" }}>
            <label htmlFor="file-input">
              <Image
                width={30}
                height={30}
                src={mediaIcon}
                alt="media add"
                style={{ cursor: "pointer" }}
              />
            </label>
            <input
              id="file-input"
              type="file"
              hidden
              onChange={handleImageUpload}
            />
          </IconButton>
        </Box>
      </Box>
      {selectedImage && (
        <Box
          sx={{
            pl: "62px",
            mb: "10px",
            position: "relative",
            width: "140px",
          }}
        >
          <Image
            width={50}
            height={55}
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ objectFit: "cover" }}
          />
          <IconButton
            onClick={handleRemoveImage}
            sx={{
              position: "absolute",
              top: "-15px",
              right: 0,
            }}
          >
            <Image width={25} src={deleteIcon} alt="delete" />
          </IconButton>
        </Box>
      )}
      {(commentText.trim() || selectedImage) && (
        <Box
          sx={{
            p: "0 10px 10px 60px",
            width: "180px",
          }}
        >
          <ConfirmBtn
            onClick={handleAddComment}
            backgroundImage={confirmBtn.src}
            text="Comment"
          />
        </Box>
      )}
    </Box>
  );
}
