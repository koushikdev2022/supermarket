import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../stores/api';
import errorHandler from '../stores/errorHandler';
export const addProductInList = createAsyncThunk(
    'list/addProductInList',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.post('/user-cart/add-to-cart', payload);
            if (response?.status === 201) {
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
);

// User slice
const addproductlistSlice = createSlice({
    name: 'list',
    initialState: {
        data: [], // To store the user list data
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductInList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductInList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload
            })
            .addCase(addProductInList.rejected, (state, payload) => {
                state.loading = false;
                state.error = payload
            });
    },
});

// Export the reducer
export default addproductlistSlice.reducer;
