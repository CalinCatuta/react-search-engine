import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  jobs: [],
  total: 0,
  totalJobs: 0,
  totalCompany: 0,
};

// Create slice
const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs(state, action) {
      // Filter out duplicates before adding new jobs
      const uniqueJobs = action.payload.filter(
        (job) => !state.jobs.some((existingJob) => existingJob.id === job.id)
      );
      state.jobs = [...state.jobs, ...uniqueJobs];
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    clearTotal: (state) => {
      state.total = 0;
    },
    setNumberOfJobs(state, action) {
      state.totalJobs = action.payload;
    },
    setNumberOfCompany(state, action) {
      state.totalCompany = action.payload;
    },
  },
});

// Export actions
export const {
  setJobs,
  setTotal,
  clearTotal,
  setNumberOfJobs,
  setNumberOfCompany,
} = jobsSlice.actions;

// Export reducer
export default jobsSlice.reducer;
