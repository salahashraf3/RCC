import { createSlice } from "@reduxjs/toolkit";

export const ProfileSwitchSlice = createSlice({
  name: "profileSwitch",
  initialState: {
    visible: false,
  },
  reducers: {
    showProfile: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const { showProfile, hideProfile } = ProfileSwitchSlice.actions;
