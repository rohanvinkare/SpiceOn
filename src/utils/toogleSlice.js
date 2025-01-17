/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
  name: "toogleSlice",
  initialState: {
    searchBarToogle: false,
    loginToggle: false,
    isDiffRes: false,
    similarResDishes: {
      isSimilarResDishes: false,
      city: "",
      resLocation: "",
      resId: "",
      itemId: "",
    }
  },
  // For Actions
  reducers: {
    toogleSearchBar: (state) => {
      state.searchBarToogle = !state.searchBarToogle;
    },
    toogleLogin: (state) => {
      state.loginToggle = !state.loginToggle;
    },
    toogleDiffRes: (state) => {
      state.isDiffRes = !state.isDiffRes;
    },
    setSimilarResDishes: (state, action) => {
      state.similarResDishes = action.payload;
    },
    resetSimilarResDishes: (state) => {
      state.similarResDishes = {
        isSimilarResDishes: false,
        city: "",
        resLocation: "",
        resId: "",
        itemId: "",
      }
    }
  },
});

export const {
  toogleSearchBar,
  toogleLogin,
  toogleDiffRes,
  resetSimilarResDishes,
  setSimilarResDishes
} = toogleSlice.actions;
export default toogleSlice.reducer;
