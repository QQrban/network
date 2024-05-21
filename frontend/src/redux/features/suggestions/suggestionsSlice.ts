import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Group = {
  ID: number;
  title: string;
  created: string;
  description: string;
};

type User = {
  ID: number;
  firstName: string;
  followInfo: null;
  image: string | null;
  nickname: string;
};

type SuggestionsState = {
  Groups: Group[];
  Users: User[];
};

const initialState: SuggestionsState = {
  Groups: [],
  Users: [],
};

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    setSuggestions: (state, action: PayloadAction<SuggestionsState>) => {
      state.Groups = action.payload.Groups;
      state.Users = action.payload.Users;
    },
  },
});

export const { setSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
