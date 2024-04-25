import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let initialState = {
  user: "",
  token: "",
  loading: false,
  errorLogin: null,
  message: null,
};

export const loginUser = createAsyncThunk('LoginUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, data);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


const LoginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errorLogin = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorLogin = action.payload.message;
      });
  },
});

export const { addToken, addUser, clearErrorLogin } = LoginSlice.actions;
export default LoginSlice.reducer;
