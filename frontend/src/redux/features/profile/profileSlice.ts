import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: ProfileState;
};

type ProfileState = {
  id: number;
  about: string;
  firstName: string;
  lastName: string;
  nickname: string;
  private: boolean;
};

const initialState: InitialState = {
  value: {
    id: 0,
    about: "",
    firstName: "",
    lastName: "",
    nickname: "",
    private: false,
  },
};

const getProfile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    putProfile: (state, action) => {
      state.value = {
        ...action.payload,
      };
    },
  },
});

export const { putProfile } = getProfile.actions;

export default getProfile.reducer;
