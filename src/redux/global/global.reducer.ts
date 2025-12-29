import { PayloadAction } from "@reduxjs/toolkit";
import { GlobalSlice } from "./global.types";

export const globalReducers = {
  setToken: (state: GlobalSlice, action: PayloadAction<string | undefined>) => {
    state.token = action.payload;
  },
};
