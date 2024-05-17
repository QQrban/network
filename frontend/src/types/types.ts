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

export interface PostProps {
  aboutID: number | null;
  author: {
    ID: number;
    firstName: string;
    image: string | null;
    lastName: string;
    nickname: string;
  };
  authorID: number;
  content: string;
  created: string;
  groupID: string;
  images: string;
  postID: number;
  status: string;
}
