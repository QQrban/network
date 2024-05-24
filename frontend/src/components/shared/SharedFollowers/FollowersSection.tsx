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
          const people = data.filter(
            (item: any) =>
              !item.followInfo.youToMePending && !item.followInfo.meToYouPending
          );
          setPeopleList(people);
          console.log(data);
        } else if (activeTab === "Requests") {
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
          if (activeTab !== "Followers") {
            setPeopleList((prevList: any[]) =>
              prevList.filter((person) => person.ID !== userToUnfollow)
            );
          } else {
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
        console.log(peopleList);

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
        />
      ) : (
        <>
          <FollowersCard
            peopleList={peopleList}
            activeTab={activeTab}
            id={id}
            unfollowHandler={unfollowHandler}
            follow={follow}
          />
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
