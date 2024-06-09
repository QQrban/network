import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Typography, styled } from "@mui/material";
import SelectSpecificFollowers from "./SelectSpecificFollowers";

interface PostPrivacyModalProps {
  openSpecificFollowers: boolean;
  setOpenSpecificFollowers: React.Dispatch<boolean>;
  openPrivacyModal: boolean;
  setOpenPrivacyModal: React.Dispatch<boolean>;
  privatePost: "public" | "private" | "manual";
  setPrivatePost: React.Dispatch<
    React.SetStateAction<"public" | "private" | "manual">
  >;
  allowedUsers: number[];
  setAllowedUsers: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function PostPrivacyModal({
  openPrivacyModal,
  openSpecificFollowers,
  setOpenPrivacyModal,
  setOpenSpecificFollowers,
  privatePost,
  setPrivatePost,
  allowedUsers,
  setAllowedUsers,
}: PostPrivacyModalProps) {
  const handleClose = () => {
    setOpenPrivacyModal(false);
    setOpenSpecificFollowers(false);
  };

  const handlePrivacy = (value: "public" | "private" | "manual") => {
    setPrivatePost(value);
    if (value === "manual") {
      setOpenSpecificFollowers(true);
    } else {
      setAllowedUsers([]);
      setOpenSpecificFollowers(false);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={openPrivacyModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <FormControl>
            <FormLabel
              sx={{
                fontFamily: "SchoolBell",
                fontSize: "25px",
                color: "black",
              }}
              id="demo-radio-buttons-group-label"
            >
              Post Privacy
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={privatePost}
              name="radio-buttons-group"
              onChange={(e) =>
                handlePrivacy(e.target.value as "public" | "private" | "manual")
              }
            >
              <FormControlLabel
                value="public"
                control={<Radio />}
                label={<StyledTypography>Public</StyledTypography>}
              />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label={<StyledTypography>Private</StyledTypography>}
              />
              <FormControlLabel
                value="manual"
                control={<Radio />}
                label={<StyledTypography>Specific Followers</StyledTypography>}
              />
            </RadioGroup>
          </FormControl>
          <SelectSpecificFollowers
            openSpecificFollowers={openSpecificFollowers}
            allowedUsers={allowedUsers}
            setAllowedUsers={setAllowedUsers}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Gloria Hallelujah", fontSize: "20px" }}
            onClick={handleClose}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const StyledTypography = styled(Typography)`
  font-family: SchoolBell !important;
  font-size: 20px;
`;
