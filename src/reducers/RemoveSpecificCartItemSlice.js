import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../stores/api';
import errorHandler from '../stores/errorHandler';

export const removeSpecificCartItem = createAsyncThunk(
    'remove/removeSpecificCartItem',
    async (cartitemId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("videoToken"); // Get the token
            const headers = {
                Authorization: `Bearer ${token}`, // Include the token in headers
            };
            const response = await api.post('/user-cart/remove-cart-item', {
                "cart_item_id": cartitemId
            }, { headers });
            if (response?.status === 200) {
                return cartitemId;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
);

// RemoveSpecific CartItem slice
const removeCartItemSlice = createSlice({
    name: 'remove',
    initialState: {
        data: [], // To store the user list data
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(removeSpecificCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeSpecificCartItem.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload?.data; // Store API response here
            })
            .addCase(removeSpecificCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the reducer
export default removeCartItemSlice.reducer;