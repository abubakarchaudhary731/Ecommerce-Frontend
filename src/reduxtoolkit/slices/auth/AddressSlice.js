import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import store from '@/reduxtoolkit/Store';
import axios from 'axios';

let initialState = {
  loading: false,
  errors: null,
  message: null,
};

export const addressStore = createAsyncThunk('addressStore', async (data, { rejectWithValue }) => {
    const token = store.getState().LoginUser.token
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/useraddress/store`, data, {
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
});


const AddressSlice = createSlice({
  name: "AddressSlice",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addressStore.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(addressStore.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(addressStore.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default AddressSlice.reducer;
