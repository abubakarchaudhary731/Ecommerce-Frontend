import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import store from '@/reduxtoolkit/Store';
import axios from 'axios';

let initialState = {
  userAddresses: [],
  loading: false,
  errors: null,
  message: null,
};

// ****************** Add Address ********************* //
export const addressStore = createAsyncThunk('addressStore', async (data) => {
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

// ****************** Get Addresses ********************* //
export const getAddress = createAsyncThunk('getAddress', async () => {
  const token = store.getState().LoginUser.token
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/useraddress`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
});

// ****************** Delete Address ********************* //
export const deleteAddress = createAsyncThunk('deleteAddress', async (id) => {
  const token = store.getState().LoginUser.token
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/useraddress/delete/${id}`, {}, {
      headers: {
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
      // ****************** Add Address ********************* //
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
      })

      // ****************** Get Addresses ********************* //
      .addCase(getAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.userAddresses = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })

      // ****************** Delete Addresses ********************* //
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
  },
});

export default AddressSlice.reducer;
