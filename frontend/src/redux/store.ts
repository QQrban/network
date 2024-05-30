import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/profile/profileSlice";
import suggestionsReducer from "./features/suggestions/suggestionsSlice";
import initmessageReducer from "./features/initMessage/initeMessageSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    profileReducer,
    suggestionsReducer,
    initmessageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
