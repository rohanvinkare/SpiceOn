import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: {
    filterVal: null,
  },

  reducers: {
    setFilterValue: (state, action) => {
      state.filterVal = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setFilterValue } = filterSlice.actions;
