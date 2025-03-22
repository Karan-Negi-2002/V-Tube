import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:'app',
    initialState:{
        open:true,
        searchSuggestion:[]
    },
    reducers:{
        toggle:(state)=>{
            state.open=!state.open
            
        },
        
        setSearchSuggestion:(state,action)=>{
            state.searchSuggestion=action.payload
        }


       
    }
})

export const {toggle,setSearchSuggestion} = appSlice.actions;
export default appSlice.reducer;