import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   numbers: []
}

export const uploadFileSlice = createSlice({
   name: 'uploadFileSlice',
   initialState,
   
   reducers: {
      setNumbers: (state, action) => {
         state.numbers = action.payload
      }
   }
})

export const { setNumbers } = uploadFileSlice.actions

export default uploadFileSlice.reducer