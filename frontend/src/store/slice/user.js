import { createSlice } from "@reduxjs/toolkit";
import { register, getInfor,updateUser,recieveSaving } from "../action/user";

const initialState = {
  pending: false,
  error: false,
  success: false,
  isLogged: false,
  userInfor: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    getProfile: (state) => {
      let res = localStorage.getItem("user");
      if (res) state.userInfor = JSON.parse(res).user;
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.success = false;
    },
    [register.fulfilled]: (state) => {
      state.pending = false;
      state.success = true;
    },
    [register.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
  extraReducers: {
    [updateUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.success = false;
    },
    [updateUser.fulfilled]: (state) => {
      state.pending = false;
      state.success = true;
    },
    [updateUser.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
  extraReducers: {
    [recieveSaving.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.success = false;
    },
    [recieveSaving.fulfilled]: (state) => {
      state.pending = false;
      state.success = true;
    },
    [recieveSaving.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
  extraReducers: {
    [getInfor.pending]: (state) => {
      state.pending = true;
      state.error = false;
      state.success = false;
    },
    [getInfor.fulfilled]: (state, action) => {
      state.pending = false;
      state.success = true;
      state.userInfor = action.payload;
    },
    [getInfor.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { updateStart, updateSuccess, updateFailure, login, getProfile } =
  userSlice.actions;
export default userSlice.reducer;
