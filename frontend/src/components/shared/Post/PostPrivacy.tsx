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
  openPrivacyModal: boolean;
  setOpenPrivacyModal: React.Dispatch<boolean>;
}

export default function PostPrivacyModal({
  openPrivacyModal,
  setOpenPrivacyModal,
}: PostPrivacyModalProps) {
  const [openSpecificFollowers, setOpenSpecificFollowers] =
    React.useState<boolean>(false);

  const handleClose = () => {
    setOpenPrivacyModal(false);
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
              defaultValue="public"
              name="radio-buttons-group"
            >
              <FormControlLabel
                onClick={() => setOpenSpecificFollowers(false)}
                value="public"
                control={<Radio />}
                label={<StyledTypography>Public</StyledTypography>}
              />
              <FormControlLabel
                onClick={() => setOpenSpecificFollowers(false)}
                value="private"
                control={<Radio />}
                label={<StyledTypography>Private</StyledTypography>}
              />
              <FormControlLabel
                onClick={() => setOpenSpecificFollowers(true)}
                value="specific"
                control={<Radio />}
                label={<StyledTypography>Specific Followers</StyledTypography>}
              />
            </RadioGroup>
          </FormControl>
          <SelectSpecificFollowers
            openSpecificFollowers={openSpecificFollowers}
            setOpenSpecificFollowers={setOpenSpecificFollowers}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
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
