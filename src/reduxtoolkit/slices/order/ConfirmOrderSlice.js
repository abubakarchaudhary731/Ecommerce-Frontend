import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import store from '@/reduxtoolkit/Store';
import axios from 'axios';

let initialState = {
  orders: [],
  loading: false,
  errors: null,
  message: null,
};

// ****************** Place Order  ********************* //
export const placeOrder = createAsyncThunk('placeOrder', async (data) => {
  console.log(data);
  const token = store.getState().LoginUser.token
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/order/store`, data, {
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

// ****************** Get all Orders History ********************* //
export const orderHistory = createAsyncThunk('orderHistory', async () => {
  const token = store.getState().LoginUser.token
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/store`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
});

const ConfirmOrderSlice = createSlice({
  name: "ConfirmOrderSlice",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // ****************** Place Order  ********************* //
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })

      // ****************** Get all Orders History ********************* //
      .addCase(orderHistory.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(orderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(orderHistory.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
  },
});

export default ConfirmOrderSlice.reducer;
