import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: JSON.parse(localStorage.getItem("isDarkMode")) || false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
