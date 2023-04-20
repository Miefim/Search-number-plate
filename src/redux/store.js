import { configureStore } from "@reduxjs/toolkit";

import uploadFileSlice from "./slice/uploadFileSlice";
import searchSlice from "./slice/searchSlice";

export const store = configureStore({
   reducer: {
      uploadFileSlice,
      searchSlice
   }
})