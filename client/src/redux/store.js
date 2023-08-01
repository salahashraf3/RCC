import { configureStore } from "@reduxjs/toolkit" 
import { combineReducers } from "redux"
import { alertsSlice } from "./alertsSlice"
import { ProfileSwitchSlice } from "./userProfileSwitch"
import { themeSwitchSlice } from "./themeSlice"
import { CodeSectionSwitch } from "./codeSectionSwitch"
import { UsersListSectionSwitch } from "./usersListSectionSlice"

const rootReducer = combineReducers({
    alerts: alertsSlice.reducer,
    profileSwitch: ProfileSwitchSlice.reducer,
    themeSwitch: themeSwitchSlice.reducer,
    codeSwitch: CodeSectionSwitch.reducer,
    usersListSwitch: UsersListSectionSwitch.reducer
})


const store = configureStore({
    reducer: rootReducer,
})

export default store