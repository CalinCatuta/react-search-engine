import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  q: ["Mecanic, Bucatar"],
  city: [""],
  county: [""],
  country: "România",
  company: [""],
  remote: [""],
  page: 1,
};
export const stringSlice = createSlice({
  name: "urlString",
  initialState,
  reducers: {
    updateQ: (state, action) => {
      state.q = action.payload ? action.payload : "";
    },
    updatCity: (state, action) => {
      state.city = action.payload ? action.payload : "";
    },
    updateCounty: (state, action) => {
      state.county = action.payload ? action.payload : "";
    },
    updateCompany: (state, action) => {
      state.company = action.payload ? action.payload : "";
    },
    updateRemote: (state, action) => {
      state.remote = action.payload ? action.payload : "";
    },
    updatePage: (state, action) => {
      state.page = Number(action.payload);
    },
    incrementPage: (state) => {
      state.page = state.page + 1;
    },
    setPageToOne: (state) => {
      state.page = 1;
    },
  },
});
export const {
  updateQ,
  updatCity,
  updateCounty,
  updateCompany,
  updateRemote,
  incrementPage,
  setPageToOne,
  updatePage,
} = stringSlice.actions;
export default stringSlice.reducer;
