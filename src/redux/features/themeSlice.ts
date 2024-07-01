import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const getSelectedThemeMode = (state: RootState) => state.theme.darkMode;

export default themeSlice.reducer;
