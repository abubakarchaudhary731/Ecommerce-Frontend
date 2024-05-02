import store from "@/reduxtoolkit/Store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    CheckoutData: [],
    loading: false,
    error: null,
};

// ****************** return Checkout Data ********************* //
export const proceedToCheckout = createAsyncThunk("proceedToCheckout", async (ids, { rejectWithValue }) => {
    const token = store.getState().LoginUser.token;
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/checkout/store`, ids, {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const CheckoutSlice = createSlice({
    name: "CheckoutSlice",
    initialState,
    reducers: {
        resetCheckoutState: (state) => {
            state.CheckoutData = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // ****************** ADD To CART ********************* //
            .addCase(proceedToCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(proceedToCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.CheckoutData = action.payload;
            })

            .addCase(proceedToCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { resetCheckoutState } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;