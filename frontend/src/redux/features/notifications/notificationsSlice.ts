import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

const getLocalStorageItem = (key: string) => {
  if (typeof window === "undefined") {
    return null;
  }

  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }

  try {
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
};

const initialState = {
  hasNewMessage: getLocalStorageItem("hasNewMessage") ?? false,
  hasNewNotification: getLocalStorageItem("hasNewNotification") ?? false,
  senderIds: getLocalStorageItem("senderIds") ?? [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      state.hasNewMessage = true;
      if (!state.senderIds.includes(action.payload.senderId)) {
        state.senderIds.push(action.payload.senderId);
      }
      if (isBrowser) {
        localStorage.setItem("hasNewMessage", JSON.stringify(true));
        localStorage.setItem("senderIds", JSON.stringify(state.senderIds));
      }
    },
    setNewNotification: (state, action) => {
      state.hasNewNotification = action.payload;
      if (isBrowser) {
        localStorage.setItem(
          "hasNewNotification",
          JSON.stringify(action.payload)
        );
      }
    },
    resetNewMessage: (state) => {
      state.hasNewMessage = false;
      state.senderIds = [];
      if (isBrowser) {
        localStorage.setItem("hasNewMessage", JSON.stringify(false));
        localStorage.setItem("senderIds", JSON.stringify([]));
      }
    },
    removeSenderId: (state, action) => {
      state.senderIds = state.senderIds.filter(
        (id: number) => id !== action.payload.senderId
      );
      if (state.senderIds.length === 0) {
        state.hasNewMessage = false;
      }
      if (isBrowser) {
        localStorage.setItem("senderIds", JSON.stringify(state.senderIds));
        if (state.senderIds.length === 0) {
          localStorage.setItem("hasNewMessage", JSON.stringify(false));
        }
      }
    },
  },
});

export const {
  addNewMessage,
  setNewNotification,
  resetNewMessage,
  removeSenderId,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
