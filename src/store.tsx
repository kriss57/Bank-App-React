import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import requestSlice from "./slices/requestSlice";

export const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer,
    request: requestSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = {
  userInfo: {
    firstName: string;
    lastName: string;
    checked: boolean;
  };
  request: {
    isLoading: boolean;
    error: string | null;
  };
};
