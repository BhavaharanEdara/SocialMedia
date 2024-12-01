import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/users/userSlice";
import { postSlice } from "../features/posts/postSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
  },
});
