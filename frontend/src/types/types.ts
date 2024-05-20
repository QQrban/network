export interface ContactsProps {
  ID: number;
  firstName: string;
  lastName: string;
  nickname: string;
  image: string | null;
  followInfo: {
    meToYou: boolean;
    meToYouPending: boolean;
    youToMePending: boolean;
  };
}

export interface GroupProps {
  ID: number;
  created: string;
  title: string;
  description: string;
  IncludesMe: boolean;
  ownerID: number;
  pendingRequest: boolean;
  ownerName: string;
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
