import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let initialState = {
    products: [],
    singleProduct: {},
    loading: false,
    errors: null,
};

// ************* Get All Products ************* //
export const getProducts = createAsyncThunk('getProducts', async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products`);
        return response.data;
    } catch (error) {
        return error;
    }
});

// ************* Get Single Product ************* //
export const getSingleProduct = createAsyncThunk('getSingleProduct', async (id) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
});

const ProductSlice = createSlice({
    name: "ProductSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // ************* Get All Products ************* //
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })

            // ************* Get Single Product ************* //
            .addCase(getSingleProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.singleProduct = action.payload;
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            });
    },
});

export default ProductSlice.reducer;
