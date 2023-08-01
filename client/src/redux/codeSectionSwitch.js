import { createSlice } from "@reduxjs/toolkit";


export const CodeSectionSwitch = createSlice({
    name:"codeSwitch",
    initialState: {
        visible: false
    },
    reducers: {
        showCode: (state)=>{
            state.visible = !state.visible
        }
    }
})

export const {showCode} = CodeSectionSwitch.actions