import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    aller: "",
    retour: "",
  },
  reducers: {
    sendAller: (state, action) => {
      state.aller = action.payload;
    },
    sendRetor: (state, action) => {
      state.retour = action.payload;
    },
  },
});
