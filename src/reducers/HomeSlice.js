import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../stores/api";

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.get('/admin/category', userInput);
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

export const getFreshProduct = createAsyncThunk(
    'product/getFreshProduct',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/product/list', userInput);
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

export const getDailyNeeds = createAsyncThunk(
    'product/getDailyNeeds',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/product/list', userInput);
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
    categories: [],
    message: "",
    freshProlist: [],
    dailyNeedsPro: []
}
const HomeSlice = createSlice(
    {
        name: "cateGories",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getCategories.pending, (state) => {
                state.loading = true;
            })
                .addCase(getCategories.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.categories = payload
                })
                .addCase(getCategories.rejected, (state, { payload }) => {
                    state.error = false
                    state.message =
                        payload.payload !== undefined && payload.payload.message
                            ? payload.payload.message
                            : 'Something went wrong. Try again later.';
                })
                .addCase(getFreshProduct.pending, (state) => {
                    state.loading = true
                })
                .addCase(getFreshProduct.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.freshProlist = payload
                    state.error = false
                })
                .addCase(getFreshProduct.rejected, (state, { payload }) => {
                    state.error = false
                    state.message =
                        payload.payload !== undefined && payload.payload.message
                            ? payload.payload.message
                            : 'Something went wrong. Try again later.';
                })
                .addCase(getDailyNeeds.pending, (state) => {
                    state.loading = true
                })
                .addCase(getDailyNeeds.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.dailyNeedsPro = payload
                    state.error = false
                })
                .addCase(getDailyNeeds.rejected, (state, { payload }) => {
                    state.error = false
                    state.message =
                        payload.payload !== undefined && payload.payload.message
                            ? payload.payload.message
                            : 'Something went wrong. Try again later.';
                })
        }
    }
)
export default HomeSlice.reducer;