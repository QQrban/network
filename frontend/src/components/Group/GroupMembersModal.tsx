import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ContactsProps } from "@/types/types";
import ProfileImage from "../shared/ProfileImage";
import { Divider, Typography } from "@mui/material";
import Link from "next/link";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

interface GroupMembersModalProps {
  openMembersModal: boolean;
  setOpenMembersModal: React.Dispatch<React.SetStateAction<boolean>>;
  members: ContactsProps[];
}

export default function GroupMembersModal({
  openMembersModal,
  setOpenMembersModal,
  members,
}: GroupMembersModalProps) {
  const handleClose = () => setOpenMembersModal(false);

  return (
    <Modal
      open={openMembersModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{
            fontSize: "29px",
            fontFamily: "Schoolbell !important",
            textAlign: "center",
            padding: "10px",
          }}
        >
          Group Members
        </Typography>
        <Divider />
        {members.map((member) => (
          <Link href={`/profile/${member.ID}`} key={member.ID}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "6px",
                m: 2,
                "&:hover": {
                  background: "#e2e2e2",
                },
              }}
            >
              <ProfileImage width={40} height={40} image={member.image} />
              <Typography variant="body1" sx={{ ml: 2 }}>
                {member.firstName} {member.lastName}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Modal>
  );
}
