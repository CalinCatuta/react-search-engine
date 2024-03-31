import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

// Slices
import stringSlice from "./reducers/stringSlice";
import jobsSlice from "./reducers/jobsSlice";

export default configureStore({
  reducer: {
    string: stringSlice,
    jobs: jobsSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk],
});
