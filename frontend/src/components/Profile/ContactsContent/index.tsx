"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ConfirmBtn from "@/components/shared/ConfirmBtn";
import confirmBtn from "../../../../public/icons/confirmButton.svg";

import FollowersSection from "@/components/shared/SharedFollowers/FollowersSection";
import { usePathname } from "next/navigation";

export default function ContactsContent() {
  const [activeTab, setActiveTab] = useState<string>("Followers");
  const [profileId, setProfileId] = useState<string>("");

  const pathname = usePathname().split("/").pop();

  useEffect(() => {
    if (pathname !== undefined) {
      setProfileId(pathname);
    }
  }, [pathname]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "26px",
        }}
      >
        <Box
          sx={{
            background: activeTab === "Followers" ? "#500606" : "",
            width: "160px",
          }}
        >
          <ConfirmBtn
            backgroundImage={confirmBtn.src}
            text="Followers"
            onClick={() => setActiveTab("Followers")}
          />
        </Box>
        <Box
          sx={{
            background: activeTab === "Following" ? "#500606" : "",
            width: "160px",
          }}
        >
          <ConfirmBtn
            backgroundImage={confirmBtn.src}
            text="Following"
            onClick={() => setActiveTab("Following")}
          />
        </Box>
      </Box>
      <Box
        sx={{
          mt: "23px",
          display: "flex",
          gap: "29px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FollowersSection activeTab={activeTab} profileId={profileId} />
      </Box>
    </Box>
  );
}
