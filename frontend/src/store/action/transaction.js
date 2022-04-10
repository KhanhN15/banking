import { createAsyncThunk } from "@reduxjs/toolkit";
import transactionApi from "../../api/transactionApi";


export const getLog = createAsyncThunk("transaction/get-log", async (card) => {
  try {
    const response = await transactionApi.getTransctions(card);
    return response.data.message.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getSaving = createAsyncThunk("saving/get-saving", async (id) => {
  try {
    const response = await transactionApi.getSavingMoney(id);
    return response.data.message.data;
  } catch (error) {
    return error.response.data.message;
  }
});
