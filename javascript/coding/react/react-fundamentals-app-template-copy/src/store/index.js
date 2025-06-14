import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import coursesSlice from "./slices/coursesSlice";
import authorsSlice from "./slices/authorsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    courses: coursesSlice,
    authors: authorsSlice,
  },
});

export default store;
