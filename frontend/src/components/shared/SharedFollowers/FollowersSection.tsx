"use client";

import { useEffect, useState } from "react";
import AlertDialog from "../Dialog";
import { ContactsProps } from "@/types/types";
import { fetchFromServer } from "@/lib/api";
import { useSelector } from "react-redux";
import FollowersCard from "./FollowersCard";
import RequestsCard from "./RequestsCard";

interface Props {
  activeTab: string;
  profileId: string | null;
}

export default function FollowersSection({ activeTab, profileId }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [peopleList, setPeopleList] = useState<ContactsProps[]>([]);
  const [followerName, setFollowerName] = useState<string>("");
  const [userToUnfollow, setUserToUnfollow] = useState<number | null>(null);
  // "/user/([0-9]+)/accept"
  // "/user/([0-9]+)/reject"
  const [followRequest, setFollowRequests] = useState<ContactsProps[]>([]);

  const id = useSelector((state: any) => state.authReducer.value.id);

  useEffect(() => {
    const getFollowers = async () => {
      if (profileId) {
        const endpoint =
          activeTab === "Followers" || activeTab === "Requests"
            ? "followers"
            : "following";
        const response = await fetchFromServer(
          `/user/${profileId}/${endpoint}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        if (activeTab === "Followers" || activeTab === "Following") {
          console.log(data);

          const people = data.filter(
            (item: any) => !item.followInfo.youToMePending
          );
          setPeopleList(people);
        } else if (activeTab === "Requests") {
          console.log(data);
          const people = data.filter((item: any) => {
            return item.followInfo.youToMePending;
          });
          setFollowRequests(people);
        }
      }
    };
    getFollowers();
  }, [profileId, activeTab]);

  const unfollowHandler = async (
    event: React.MouseEvent,
    name: string,
    userID: number
  ) => {
    event.preventDefault();
    setOpen(true);
    setFollowerName(name);
    setUserToUnfollow(userID);
  };

  const confirmUnfollow = async () => {
    if (profileId && userToUnfollow !== null) {
      try {
        const response = await fetchFromServer(
          `/user/${userToUnfollow}/unfollow`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        if (response.ok) {
          setPeopleList((prevList: any[]) =>
            prevList.map((person) =>
              person.ID === userToUnfollow
                ? {
                    ...person,
                    followInfo: {
                      ...person.followInfo,
                      meToYou: false,
                    },
                  }
                : person
            )
          );
        }
      } catch (error) {
        console.error("Error unfollowing user:", error);
      }
      setOpen(false);
      setFollowerName("");
      setUserToUnfollow(null);
    }
  };

  const follow = async (userID: number) => {
    try {
      const response = await fetchFromServer(`/user/${userID}/follow`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setPeopleList((prevList: any[]) =>
          prevList.map((person) =>
            person.ID === userID
              ? {
                  ...person,
                  followInfo: {
                    ...person.followInfo,
                    meToYou: true,
                  },
                }
              : person
          )
        );
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const confirmFollowRequest = async (userID: number) => {
    try {
      const response = await fetchFromServer(`/user/${userID}/accept`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setFollowRequests((prevList) =>
          prevList.filter((person) => person.ID !== userID)
        );
      }
    } catch (error) {
      console.error("Error accepting follow from user:", error);
    }
  };

  const denyFollowRequest = async (userID: number) => {
    try {
      const response = await fetchFromServer(`/user/${userID}/reject`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setFollowRequests((prevList) =>
          prevList.filter((person) => person.ID !== userID)
        );
      }
    } catch (error) {
      console.error("Error rejecting follow from user:", error);
    }
  };

  return (
    <>
      {activeTab === "Requests" ? (
        <RequestsCard
          activeTab={activeTab}
          setFollowRequests={setFollowRequests}
          followRequest={followRequest}
          id={id}
          unfollowHandler={unfollowHandler}
          follow={follow}
        ></RequestsCard>
      ) : (
        <>
          <FollowersCard
            peopleList={peopleList}
            activeTab={activeTab}
            id={id}
            unfollowHandler={unfollowHandler}
            follow={follow}
          ></FollowersCard>
        </>
      )}
      <AlertDialog
        title={`Unfollow ${followerName}`}
        dialogText="Are you sure you want to unfollow?"
        open={open}
        setOpen={setOpen}
        onConfirm={confirmUnfollow}
      />
    </>
  );
}
