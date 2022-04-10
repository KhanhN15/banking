import { createSlice } from "@reduxjs/toolkit";
import { getLog, getSaving } from "../action/transaction";

const initialState = {
  pending: false,
  error: false,
  success: false,
  log:[],
  detailSaving:{}
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: initialState,
  extraReducers: {
    [getLog.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.success = false;
    },
    [getLog.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.pending = false;
      state.success = true;
      state.log = action.payload;
    },
    [getLog.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
  extraReducers: {
    [getSaving.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.success = false;
    },
    [getSaving.fulfilled]: (state, action) => {
      state.pending = false;
      state.success = true;
      state.detailSaving = action.payload;
    },
    [getSaving.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { updateStart, updateSuccess, updateFailure} =
  transactionSlice.actions;
export default transactionSlice.reducer;
