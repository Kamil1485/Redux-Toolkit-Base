import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/Users";
import contentSlice from "../features/contentSlice";
import localSlice from "../features/LocalUser";
export const store = configureStore({
  reducer: {
    users: userSlice,
    content: contentSlice,
    localuser: localSlice,
  },
});

