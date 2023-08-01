import { createSlice } from "@reduxjs/toolkit";

export const themeSwitchSlice = createSlice({
  name: "themeSwitch",
  initialState: {
    dark: false,
  },
  reducers: {
    switchTheme: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const { switchTheme } = themeSwitchSlice.actions;
