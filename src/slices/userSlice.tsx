import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userInfo",
  initialState: {
    firstName: "",
    lastName: "",
    checked: false,
  },
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    resetUserInfo: (state, action) => {
      state.firstName = "";
      state.lastName = "";
    },
  },
});
