import store from "@/reduxtoolkit/Store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems: [],
    loading: false,
    message: null,
    error: null,
};

// ****************** ADD To CART ********************* //
export const addToCart = createAsyncThunk("addToCart", async (data, { rejectWithValue }) => {
    const token = store.getState().LoginUser.token;
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/store`, data, {
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

// ****************** Get CART Items ********************* //
export const getCartItems = createAsyncThunk("getCartItems", async () => {
    const token = store.getState().LoginUser.token
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.message;
    }
});

const CartSlice = createSlice({
    name: "CartSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // ****************** ADD To CART ********************* //
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })

            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ****************** Get CART Items ********************* //
            .addCase(getCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
            })

            .addCase(getCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

// export const { } = AddToCartSlice.actions;
export default CartSlice.reducer;
