import { createSlice } from "@reduxjs/toolkit";


export const UsersListSectionSwitch = createSlice({
    name: "usersListSwitch",
     initialState: {
        visible: false
    },
    reducers: {
        showUsers: (state)=>{
            state.visible = !state.visible
        }
    }
})

export const { showUsers} = UsersListSectionSwitch.actions