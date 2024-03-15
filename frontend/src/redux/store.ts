import { configureStore } from "@reduxjs/toolkit";
import  usersSlice  from "./usersSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;