import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from '../store'

type SearchState = {
   searchValue: string
   foundNumber: string[] | null
}

const initialState: SearchState = {
   searchValue: '',
   foundNumber: null
}

export const searchSlice = createSlice({
   name: 'searchSlice',
   initialState,
   
   reducers: {

      setSearchValue: (state, action: PayloadAction<string>) => {
         state.searchValue = action.payload
      },

      setFoundNumber: (state, action: PayloadAction<string[] | null>) => {
         state.foundNumber = action.payload
      }
      
   }
})

export const searchSelector = (state: RootState) => state.searchSlice

export const { setSearchValue, setFoundNumber } = searchSlice.actions

export default searchSlice.reducer