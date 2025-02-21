import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../stores/api";

export const priceSearch = createAsyncThunk(
    'priceSearch',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/product/search', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Something went wrong.');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)
const initialState = {
    loading: false,
    error: false,
    priceSearchData: [],
    message: ""
}
const PricingSearchSlice = createSlice(
    {
        name: 'search_price',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(priceSearch.pending, (state) => {
                state.loading = false
            })
                .addCase(priceSearch.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.priceSearchData = payload
                    state.error = false
                })
                .addCase(priceSearch.rejected, (state, { payload }) => {
                    state.error = false
                    state.message =
                        payload.payload !== undefined && payload.payload.message
                            ? payload.payload.message
                            : 'Something went wrong. Try again later.';
                })
        }
    }
)
export default PricingSearchSlice.reducer;