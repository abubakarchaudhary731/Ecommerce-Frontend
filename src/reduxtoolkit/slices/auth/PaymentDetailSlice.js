import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import store from '@/reduxtoolkit/Store';
import axios from 'axios';

let initialState = {
  userCards: [],
  loading: false,
  errors: null,
  message: null,
};

// ****************** Add Card ********************* //
export const cardStore = createAsyncThunk('cardStore', async (data) => {
  const token = store.getState().LoginUser.token
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/paymentdetail/store`, data, {
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

// ****************** Get Card ********************* //
export const getCardDetail = createAsyncThunk('getCardDetail', async () => {
  const token = store.getState().LoginUser.token
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/paymentdetail`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
});

// ****************** Delete Card ********************* //
export const deleteCard = createAsyncThunk('deleteCard', async (id) => {
  const token = store.getState().LoginUser.token
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/paymentdetail/delete/${id}`, {}, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
});


const PaymentDetailSlice = createSlice({
  name: "PaymentDetailSlice",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // ****************** Add Card ********************* //
      .addCase(cardStore.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(cardStore.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(cardStore.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })

      // ****************** Get Card ********************* //
      .addCase(getCardDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCardDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userCards = action.payload;
      })
      .addCase(getCardDetail.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })

      // ****************** Delete Card ********************* //
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
  },
});

export default PaymentDetailSlice.reducer;
