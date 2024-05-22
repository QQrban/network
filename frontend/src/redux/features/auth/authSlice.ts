import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  birthday?: string;
  country?: string;
  image: string | null;
};

const initialState: InitialState = {
  value: {
    isAuth: false,
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    nickname: "",
    birthday: undefined,
    country: undefined,
    image: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<Omit<AuthState, "isAuth">>) => {
      state.value = {
        isAuth: true,
        ...action.payload,
      };
    },
    logOut: (state) => {
      return initialState;
    },
  },
});

export const { logIn: loginSuccess, logOut: logout } = authSlice.actions;

export default authSlice.reducer;
