import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import uploadFileSlice from "./slice/uploadFileSlice"
import searchSlice from "./slice/searchSlice"

export const store = configureStore({

   reducer: {

      uploadFileSlice,
      searchSlice
      
   }
   
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()