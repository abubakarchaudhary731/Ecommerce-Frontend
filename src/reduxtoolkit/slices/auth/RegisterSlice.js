import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk("registerUser", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`, data, {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const RegisterSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = action.payload.errors;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = RegisterSlice.actions;
export default RegisterSlice.reducer;
