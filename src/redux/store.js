import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../services/toggle";
import themeReducer from "../services/darkmodeReducer";

export const store = configureStore({
  reducer: {
    user: toggleReducer,
    theme: themeReducer,
  },
});
