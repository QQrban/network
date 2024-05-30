import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/profile/profileSlice";
import suggestionsReducer from "./features/suggestions/suggestionsSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    profileReducer,
    suggestionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
