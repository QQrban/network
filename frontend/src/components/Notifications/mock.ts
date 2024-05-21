import like from "../../../public/icons/give-love.svg";
import comment from "../../../public/icons/commenting.svg";
import follow from "../../../public/icons/personAdd.svg";

export interface Notification {
  id: number;
  postId: number;
  username: string;
  reaction: string;
  img: string;
  unread: boolean;
  description: string;
}

export const yourNotifications: Notification[] = [
  {
    id: 0,
    postId: 0,
    username: "Toomas",
    reaction: "New like",
    img: like,
    unread: true,
    description: "Toomas liked your post",
  },
  {
    id: 1,
    postId: 1,
    username: "Kood",
    reaction: "New comment",
    img: comment,
    unread: true,
    description: "Kood commented on your post: `Haha very funny` ",
  },
  {
    id: 2,
    postId: 2,
    username: "Toomas",
    reaction: "New like",
    img: like,
    unread: true,
    description: "Toomas liked your post",
  },
  {
    id: 3,
    postId: 2,
    username: "Toomas",
    reaction: "New follow",
    img: follow,
    unread: true,
    description: "Toomas followed you",
  },
];
