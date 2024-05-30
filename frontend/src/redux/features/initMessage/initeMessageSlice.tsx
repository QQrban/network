import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitMessageState = {
  initMessage: boolean;
  id: number;
};

type InitialState = {
  value: InitMessageState;
};

const initialState: InitialState = {
  value: {
    initMessage: false,
    id: 0,
  },
};

const InitMessageStateSlice = createSlice({
  name: "initMessage",
  initialState,
  reducers: {
    setInitMessageState: (state, action: PayloadAction<{ id: number }>) => {
      state.value = {
        initMessage: true,
        id: action.payload.id,
      };
    },
  },
});

export const { setInitMessageState } = InitMessageStateSlice.actions;
export default InitMessageStateSlice.reducer;
