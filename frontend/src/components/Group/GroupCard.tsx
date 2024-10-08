"use client";

import {
  Box,
  SpeedDial,
  SpeedDialAction,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import { Item } from "../shared/Item";
import ConfirmBtn from "../shared/ConfirmBtn";
import cardBg from "../../../public/icons/cardBG.svg";

import confirmBtn from "../../../public/icons/confirmButton.svg";
import successBtn from "../../../public/icons/successBtn.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image from "next/image";
import copyIcon from "../../../public/icons/copy.svg";
import EventSection from "../Events/EventSection";
import GroupPostsSection from "./GroupPostsSection";
import { useEffect, useState } from "react";
import CreateEventModal from "./CreateEventModal";
import { ContactsProps, EventProps } from "@/types/types";
import { fetchFromServer } from "@/lib/api";
import InviteUsers from "./InviteUsers";
import GroupMembersModal from "./GroupMembersModal";

const StyledTypography = styled(Typography)`
  font-family: "Gloria Hallelujah", sans-serif !important;
  font-weight: 600;
  font-size: 28px;
`;

const StyledTab = styled(Tab)`
  font-family: Gloria Hallelujah, sans-serif;
  font-size: 18px;
`;

interface GroupCardProps {
  openPostModal: boolean;
  groupTitle: string;
  activeTab: string;
  setActiveTab: React.Dispatch<string>;
  setOpenPostModal: React.Dispatch<boolean>;
  members: ContactsProps[];
  pathName: string | undefined;
  groupID: number;
  matchesLG: boolean;
}

export default function GroupCard({
  openPostModal,
  groupTitle,
  activeTab,
  setActiveTab,
  setOpenPostModal,
  members,
  pathName,
  groupID,
  matchesLG,
}: GroupCardProps) {
  const [openInviteModal, setOpenInviteModal] = useState<boolean>(false);
  const [openEventModal, setOpenEventModal] = useState<boolean>(false);
  const [openMembersModal, setOpenMembersModal] = useState<boolean>(false);
  const [events, setEvents] = useState<EventProps[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetchFromServer(`/group/${groupID}/events`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroups();
  }, [groupID]);

  const statusHandler = (eventID: number, status: "Going" | "Not Going") => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.ID === eventID ? { ...event, myStatus: status } : event
      )
    );
  };

  const addNewEvent = (newEvent: EventProps) => {
    setEvents((prevEvents) => [
      { ...newEvent, myStatus: "Going" },
      ...prevEvents,
    ]);
  };

  return (
    <Box sx={{ width: matchesLG ? "600px" : "100%" }}>
      <Item
        sx={{
          overflow: "hidden",
          position: "relative",
          alignSelf: "flex-start",
          backgroundImage: `url(${cardBg.src})`,
          backgroundColor: "white",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        radius="8px"
      >
        <Box
          sx={{
            p: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <StyledTypography>{groupTitle}</StyledTypography>
          <Typography
            onClick={() => setOpenMembersModal(true)}
            sx={{
              color: "#979797",
              cursor: "pointer",
              maxWidth: 150,
            }}
          >
            {members.length} {`member${members.length > 1 ? "s" : ""}`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "23px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "120px" }}>
              <ConfirmBtn
                onClick={() => setOpenInviteModal(true)}
                backgroundImage={confirmBtn.src}
                text="Invite"
              />
            </Box>
            <Box sx={{ width: "190px" }}>
              <ConfirmBtn
                onClick={() => setOpenEventModal(true)}
                backgroundImage={successBtn.src}
                text="Create Event"
              />
            </Box>
          </Box>
          <SpeedDial
            sx={{
              position: "absolute",
              top: "20px",
              right: "12px",
            }}
            ariaLabel="SpeedDial openIcon example"
            icon={<MoreHorizIcon fontSize="large" sx={{ color: "grey" }} />}
            direction="down"
            FabProps={{
              sx: {
                backgroundColor: "white",
                width: "36px",
                height: "32px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#00000014",
                },
                "&:active": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                "&:focus": {
                  outline: "none",
                },
              },
            }}
          >
            <SpeedDialAction
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://localhost:3000/groups/${pathName}`
                );
              }}
              icon={
                <Image
                  style={{ width: "27px", height: "27px" }}
                  src={copyIcon}
                  alt="copy"
                />
              }
              tooltipTitle={
                <Typography
                  sx={{
                    fontFamily: "Schoolbell !important",
                    fontSize: "17px",
                  }}
                >
                  Copy Group Link
                </Typography>
              }
            />
          </SpeedDial>
        </Box>
        <Box sx={{ mt: "23px" }}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="events tabs"
          >
            <StyledTab label="Posts" value="posts" />
            <StyledTab label="Events" value="events" />
          </Tabs>
        </Box>
      </Item>
      {activeTab === "posts" ? (
        <Box
          sx={{
            display: "flex",
            mt: "23px",
            gap: "23px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "23px",
              flexGrow: 1,
            }}
          >
            <GroupPostsSection
              matchesLG={matchesLG}
              openPostModal={openPostModal}
              pathName={pathName}
              setOpenPostModal={setOpenPostModal}
            />
          </Box>
        </Box>
      ) : events.length > 0 ? (
        <Box
          sx={{
            mt: "23px",
            display: "flex",
            flexDirection: matchesLG ? "column" : "row",
            flexWrap: matchesLG ? "unset" : "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "23px",
          }}
        >
          <EventSection
            statusHandler={statusHandler}
            events={events}
          />
        </Box>
      ) : (
        <Typography
          sx={{
            mt: "23px",
            fontSize: "30px",
            fontFamily: "Gloria Hallelujah !important",
          }}
        >
          This group has no events yet!
        </Typography>
      )}
      <CreateEventModal
        addNewEvent={addNewEvent}
        groupID={groupID}
        openEventModal={openEventModal}
        setOpenEventModal={setOpenEventModal}
      />
      <InviteUsers
        members={members}
        groupID={groupID}
        openInviteModal={openInviteModal}
        setOpenInviteModal={setOpenInviteModal}
      />
      <GroupMembersModal
        members={members}
        openMembersModal={openMembersModal}
        setOpenMembersModal={setOpenMembersModal}
      />
    </Box>
  );
}
