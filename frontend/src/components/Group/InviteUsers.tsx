"use client";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { fetchFromServer } from "@/lib/api";
import { useSelector } from "react-redux";
import { Box, Dialog, Typography, styled } from "@mui/material";
import { Item } from "../shared/Item";
import ConfirmBtn from "../shared/ConfirmBtn";
import confirmBtn from "../../../public/icons/confirmButton.svg";
import CircularIndeterminate from "../shared/CircularIndeterminate";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "750px",
    maxWidth: "none",
    padding: "20px",
  },
}));

const CustomPaper = styled(Item)(({ theme }) => ({
  width: "250px",
  height: "300px",
  overflow: "auto",
  margin: theme.spacing(2),
  padding: theme.spacing(1),
}));

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

interface InviteUsersProps {
  groupID: number;
  openInviteModal: boolean;
  setOpenInviteModal: React.Dispatch<boolean>;
}

interface FollowersData {
  firstName: string;
  lastName: string;
  profileID: number;
}

export default function InviteUsers({
  openInviteModal,
  setOpenInviteModal,
  groupID,
}: InviteUsersProps) {
  const [waiting, setWaiting] = useState<boolean>(false);
  const [followersList, setFollowersList] = useState<FollowersData[]>([]);

  const id = useSelector((state: any) => state.authReducer.value.id);

  const handleClose = () => {
    setOpenInviteModal(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchFromServer(`/user/${id}/followers`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.map((follower: any) => ({
            firstName: follower.firstName,
            lastName: follower.lastName,
            profileID: follower.ID,
          }));
          setFollowersList(filteredData);
          setLeft(
            filteredData.map((follower: FollowersData) => follower.profileID)
          );
          setRight([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [id]);
  const [checked, setChecked] = useState<readonly number[]>([]);
  const [left, setLeft] = useState<readonly number[]>([]);
  const [right, setRight] = useState<readonly number[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const sendInvitation = async (items: readonly number[]) => {
    setWaiting(true);
    for (const userID of items) {
      try {
        const response = await fetchFromServer(
          `/group/${groupID}/invite/${userID}`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.ok) {
          console.log(`Invitation sent to userID: ${userID}`);
        } else {
          console.error(`Failed to send invitation to userID: ${userID}`);
        }
      } catch (error) {
        console.error(`Error sending invitation to userID: ${userID}`, error);
      }
      await delay(500);
    }
    setWaiting(false);
    setOpenInviteModal(false);
  };

  const customList = (items: readonly number[]) => (
    <CustomPaper radius="8px">
      <List dense component="div" role="list">
        {items.map((profileID: number) => {
          const user = followersList.find(
            (follower) => follower.profileID === profileID
          );
          const labelId = `transfer-list-item-${profileID}-label`;

          if (!user) return null;

          return (
            <ListItemButton
              key={profileID}
              role="listitem"
              onClick={handleToggle(profileID)}
              sx={{ py: 1 }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(profileID) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={
                  <Typography
                    sx={{ fontFamily: "Gloria Hallelujah !important" }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </CustomPaper>
  );

  return (
    <CustomDialog
      open={openInviteModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
      </Grid>
      {right.length > 0 && (
        <Box
          sx={{
            width: "120px",
            m: "0 auto",
          }}
        >
          <ConfirmBtn
            onClick={() => sendInvitation(right)}
            text="Invite"
            backgroundImage={confirmBtn.src}
          />
        </Box>
      )}
      {waiting && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "21px",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            bgcolor: "#6868686f",
          }}
        >
          <CircularIndeterminate />
          <Typography fontWeight={600} color="primary" fontSize={24}>
            {`Please Wait... Don't Close Dialog`}
          </Typography>
        </Box>
      )}
    </CustomDialog>
  );
}
