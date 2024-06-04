import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

const getLocalStorageItem = (key: string) => {
  if (!isBrowser) {
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
  groupIds: getLocalStorageItem("groupIds") ?? [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      state.hasNewMessage = true;
      if (action.payload.isGroup) {
        if (!state.groupIds.includes(action.payload.senderId)) {
          state.groupIds.push(action.payload.senderId);
        }
      } else {
        if (!state.senderIds.includes(action.payload.senderId)) {
          state.senderIds.push(action.payload.senderId);
        }
      }
      if (isBrowser) {
        localStorage.setItem("hasNewMessage", JSON.stringify(true));
        localStorage.setItem("senderIds", JSON.stringify(state.senderIds));
        localStorage.setItem("groupIds", JSON.stringify(state.groupIds));
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
      state.groupIds = [];
      if (isBrowser) {
        localStorage.setItem("hasNewMessage", JSON.stringify(false));
        localStorage.setItem("senderIds", JSON.stringify([]));
        localStorage.setItem("groupIds", JSON.stringify([]));
      }
    },
    removeSenderId: (state, action) => {
      if (action.payload.isGroup) {
        state.groupIds = state.groupIds.filter(
          (id: number) => id !== action.payload.senderId
        );
      } else {
        state.senderIds = state.senderIds.filter(
          (id: number) => id !== action.payload.senderId
        );
      }
      if (state.groupIds.length === 0 && state.senderIds.length === 0) {
        state.hasNewMessage = false;
      }
      if (isBrowser) {
        localStorage.setItem("senderIds", JSON.stringify(state.senderIds));
        localStorage.setItem("groupIds", JSON.stringify(state.groupIds));
        if (state.senderIds.length === 0 && state.groupIds.length === 0) {
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
