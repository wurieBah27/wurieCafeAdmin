import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  showSideBar: false,
  showDropdown: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.showSideBar = action.payload;
    },
    toggleDropdown: (state, action) => {
      state.showDropdown = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar, toggleDropdown } = toggleSlice.actions;
export default toggleSlice.reducer;
