
import { createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../api/usersApi";

export const register = createAsyncThunk("auth/register", async (user) => {
  const response = await usersApi.register(user);
  return response.data;
});

export const getInfor = createAsyncThunk("user/get-infor", async (id) => {
  try {
    const response = await usersApi.getInfor(id);
    return response.data.message.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const updateUser = createAsyncThunk("user/update", async (user) => {
  try {
    const response = await usersApi.updateUser(user);
    return response.data.message.data;
  } catch (error) {
    return error.response.data.message;
  }
});
export const recieveSaving = createAsyncThunk("user/recieveSaving", async (data) => {
  try {
    const response = await usersApi.recieveSaving(data);
    return response.data.message.data;
  } catch (error) {
    return error.response.data.message;
  }
});
