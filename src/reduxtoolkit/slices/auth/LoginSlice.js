import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let initialState = {
  user: "",
  token: null,
  loading: false,
  errors: null,
  message: null,
};

export const loginUser = createAsyncThunk('LoginUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, data);
    return response.data;
  } catch (error) {
    return error;
  }
});


const LoginSlice = createSlice({
  name: "LoginSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const { logoutUser } = LoginSlice.actions;
export default LoginSlice.reducer;
