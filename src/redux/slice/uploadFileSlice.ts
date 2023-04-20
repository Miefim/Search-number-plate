import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from '../store'

type UploadFileState = {
   numbers: string[]
}

const initialState: UploadFileState = {
   numbers: []
}

export const uploadFileSlice = createSlice({
   name: 'uploadFileSlice',
   initialState,
   
   reducers: {

      setNumbers: (state, action: PayloadAction<string[]>) => {
         state.numbers = action.payload
      }
      
   }
})

export const uploadFileSelector = (state: RootState) => state.uploadFileSlice

export const { setNumbers } = uploadFileSlice.actions

export default uploadFileSlice.reducer