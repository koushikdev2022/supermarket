import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../stores/api';
import errorHandler from '../stores/errorHandler';
// import { Link, useParams } from "react-router-dom";
export const getProductList = createAsyncThunk(
    'list/getProductList',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/product/list', payload);
            if (response?.data?.status_code === 200) {
                return response?.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
);


// User slice
const productlistSlice = createSlice({
    name: 'list',
    initialState: {
        productlist: [], // To store the user list data
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.productlist = payload; // Store API response here
            })
            .addCase(getProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the reducer
export default productlistSlice.reducer;



