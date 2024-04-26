import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  username: string;
  uid: string;
};

const initialState = {
  value: {
    isAuth: true,
    username: "",
    uid: "",
  } as AuthState,
} as InitialState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
          uid: "uasuidnkwje123nkqjenkw6788qenjk",
        },
      };
    },
    logOut: (state) => {
      return initialState;
    },
  },
});

export const { logIn: loginSuccess, logOut: logout } = authSlice.actions;

export default authSlice.reducer;
