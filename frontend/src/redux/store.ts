import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/profile/profileSlice";
import suggestionsReducer from "./features/suggestions/suggestionsSlice";
import notificationsReducer from "./features/notifications/notificationsSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    profileReducer,
    suggestionsReducer,
    notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
