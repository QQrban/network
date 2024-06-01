export interface ContactsProps {
  ID: number;
  access: boolean;
  firstName: string;
  lastName: string;
  nickname: string;
  image: string | null;
  followInfo: {
    meToYou: boolean;
    meToYouPending: boolean;
    youToMePending: boolean;
  } | null;
}

export interface GroupProps {
  ID: number;
  created: string;
  title: string;
  description: string;
  IncludesMe: boolean;
  pendingRequest: boolean;
  owner: ContactsProps;
}

export interface CommentProps {
  ID: number;
  aboutID: number;
  authorID: number;
  content: string;
  images: string;
  created: string;
  author: ContactsProps;
}

export interface PostProps {
  aboutID: null;
  author: {
    ID: number;
    firstName: string;
    followInfo: null;
    image: null;
    lastName: string;
    nickname: string;
  };
  authorID: number;
  comments: CommentProps[];
  content: string;
  created: string;
  group: null;
  likes: ContactsProps[];
  groupID: number;
  images: string;
  postID: number;
  status: "public";
}

export interface EventProps {
  ID: number;
  authorID: number;
  created: string;
  description: string;
  groupID: number;
  myStatus: "Going" | "Not Going";
  options: "Going,Not Going";
  time: string;
  title: string;
}

export interface NotificationProps {
  ID: number;
  content: {
    action: "create" | "follow" | "accept" | "request" | "invite" | "like";
    endpoint: string;
    eventID: number;
    eventTitle: string;
    groupID: number;
    groupTitle: string;
    postID: number;
    postContent: string;
    type: "follow" | "event" | "group" | "post";
    userID: number;
    userName: string;
  };
  created: string;
  isGroup: boolean;
  receiverID: number;
  senderData: ContactsProps | null;
  senderID: 0;
}

export interface MessageProps {
  ID: number;
  content: string;
  created: string;
  isGroup: boolean;
  receiverID: number;
  senderData: ContactsProps | null;
  senderID: 2;
}
