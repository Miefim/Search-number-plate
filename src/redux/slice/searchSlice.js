import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   searchValue: '',
   foundNumber: null
}

export const searchSlice = createSlice({
   name: 'searchSlice',
   initialState,
   
   reducers: {
      setSearchValue: (state, action) => {
         state.searchValue = action.payload
      },

      setFoundNumber: (state, action) => {
         state.foundNumber = action.payload
      }
    }
})

export const { setSearchValue, setFoundNumber } = searchSlice.actions

export default searchSlice.reducer