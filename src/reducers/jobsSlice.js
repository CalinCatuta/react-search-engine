import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  jobs: [],
};

// Create slice
const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs(state, action) {
      state.jobs = [...state.jobs, ...action.payload];
    },
  },
});

// Export actions
export const { setJobs } = jobsSlice.actions;

// Export reducer
export default jobsSlice.reducer;
