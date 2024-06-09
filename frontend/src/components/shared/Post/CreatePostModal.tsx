import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { StyledTextArea } from "../../Login/styles";
import deleteIcon from "../../../../public/icons/delete.svg";
import privateIcon from "../../../../public/icons/locked.svg";
import publicIcon from "../../../../public/icons/unlocked.svg";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import successBtn from "../../../../public/icons/successBtn.svg";
import confirmBtn from "../../../../public/icons/confirmButton.svg";
import ConfirmBtn from "../ConfirmBtn";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePathname } from "next/navigation";
import { fetchFromServer } from "@/lib/api";
import { PostProps } from "@/types/types";
import PostPrivacyModal from "./PostPrivacy";

interface CreatePostModalProps {
  text: string;
  isProfile: boolean;
  openPostModal: boolean;
  setOpenPostModal: React.Dispatch<boolean>;
  addNewPost: (newPost: PostProps) => void;
}

const validationSchema = Yup.object({
  content: Yup.string()
    .required("Content is Required")
    .min(3, "Content must be at least 3 characters")
    .max(600, "Content must be at most 600 characters"),
});

export default function CreatePostModal({
  text,
  isProfile,
  openPostModal,
  setOpenPostModal,
  addNewPost,
}: CreatePostModalProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [privatePost, setPrivatePost] = useState<
    "public" | "private" | "manual"
  >("public");
  const [allowedUsers, setAllowedUsers] = useState<number[]>([]);
  const [openPrivacyModal, setOpenPrivacyModal] = useState<boolean>(false);
  const [openSpecificFollowers, setOpenSpecificFollowers] =
    useState<boolean>(false);

  const pathname = usePathname().split("/").pop() || "";

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      if (selectedImages.length + filesArray.length > 3) {
        setErrorMessage("You can only upload up to 3 images.");
        return;
      }

      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
      setErrorMessage(null);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("status", privatePost);
      !isProfile && formData.append("groupID", pathname);
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });

      if (allowedUsers.length > 0) {
        formData.append("allowedUsers", JSON.stringify(allowedUsers));
      }
      console.log(status, allowedUsers);

      const response = await fetchFromServer("/post", {
        method: "POST",
        body: formData,
        mode: "cors",
        credentials: "include",
      });

      if (response.ok) {
        const newPost: PostProps = await response.json();
        resetForm();
        setSelectedImages([]);
        addNewPost(newPost);
        handleClose();
      } else {
      }
    },
  });

  const handleOpenPrivacyModal = () => {
    setOpenPrivacyModal(true);
    if (privatePost === "manual") {
      setOpenSpecificFollowers(true);
    }
  };

  const handleClose = () => {
    setOpenPostModal(false);
  };

  return (
    <Dialog
      open={openPostModal}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: formik.handleSubmit,
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: "Gloria Hallelujah",
          fontWeight: 600,
          fontSize: "29px",
        }}
      >
        {text}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <IconButton
            onClick={handleOpenPrivacyModal}
            sx={{
              p: 0,
            }}
          >
            <Image
              width={27}
              height={27}
              src={
                privatePost === "private" || privatePost === "manual"
                  ? privateIcon
                  : publicIcon
              }
              alt="private"
            />
          </IconButton>
          <Typography
            sx={{
              fontFamily: "Gloria Hallelujah !important",
              fontSize: "19px",
            }}
          >
            {privatePost === "private" || privatePost === "manual"
              ? privatePost === "private"
                ? "Private"
                : "Specific"
              : "Public"}
          </Typography>
        </Box>
        <Box sx={{ position: "relative" }}>
          <StyledTextArea
            minRows={5}
            maxRows={6}
            maxLength={600}
            autoFocus
            name="content"
            aria-label="empty textarea"
            placeholder="Share your thoughts..."
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{
              width: "400px",
              mt: "23px",
              borderColor:
                formik.touched.content && Boolean(formik.errors.content)
                  ? "red"
                  : "",
            }}
          />
          {formik.touched.content && formik.errors.content && (
            <Typography color="error" sx={{ mt: 2 }}>
              {formik.errors.content}
            </Typography>
          )}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            sx={{
              background: `url(${successBtn.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              fontFamily: "Gloria Hallelujah",
              fontSize: "15px",
              boxShadow: "none",
              border: "2px solid black",
            }}
            variant="contained"
            component="label"
          >
            Upload Images
            <input type="file" hidden multiple onChange={handleImageUpload} />
          </Button>
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
            {selectedImages.map((image, index) => (
              <Box
                key={index}
                sx={{ position: "relative", width: 100, height: 100 }}
              >
                <Image
                  width={90}
                  height={100}
                  src={URL.createObjectURL(image)}
                  alt={`Selected ${index}`}
                  style={{ objectFit: "cover" }}
                />
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                >
                  <Image width={28} src={deleteIcon} alt="delete" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          sx={{
            fontFamily: "Schoolbell",
            fontSize: "24px",
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Box width={150}>
          <ConfirmBtn
            type="submit"
            backgroundImage={confirmBtn.src}
            text="Create Post"
          />
        </Box>
      </DialogActions>
      <PostPrivacyModal
        openSpecificFollowers={openSpecificFollowers}
        setOpenSpecificFollowers={setOpenSpecificFollowers}
        privatePost={privatePost}
        allowedUsers={allowedUsers}
        setAllowedUsers={setAllowedUsers}
        setPrivatePost={setPrivatePost}
        openPrivacyModal={openPrivacyModal}
        setOpenPrivacyModal={setOpenPrivacyModal}
      />
    </Dialog>
  );
}
