import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../stores/api';

// Async thunk for fetching
export const delevaryCalculation = createAsyncThunk(
    'orders/delevaryCalculation',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/order/delevary-calculation', userInput);

            if (response?.data?.status_code === true) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const placeOrder = createAsyncThunk(
    'orders/placeOrder',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/order/place-order', userInput);

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getOrderList = createAsyncThunk(
    'orders/getOrderList',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/order/order-list', userInput);

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);
const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        loading: false,
        error: null,
        message: "",
        delevaryCalculationData: {},
        placeOrderData: {},
        orderList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(delevaryCalculation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(delevaryCalculation.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.delevaryCalculationData = payload;
                state.message = payload?.message;
            })
            .addCase(delevaryCalculation.rejected, (state, response) => {
                state.loading = false;
                state.error = true;
                state.message =
                    response?.payload !== undefined && response?.payload.message
                        ? response?.payload.message
                        : 'Something went wrong. Try again later.';
            })

            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.placeOrderData = payload;
                state.message = payload?.message;
            })
            .addCase(placeOrder.rejected, (state, response) => {
                state.loading = false;
                state.error = true;
                state.message =
                    response?.payload !== undefined && response?.payload.message
                        ? response?.payload.message
                        : 'Something went wrong. Try again later.';
            })
            .addCase(getOrderList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.orderList = payload;
                state.error = false
            })
            .addCase(getOrderList.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = true
            })
    },
});

// Export the reducer
export default orderSlice.reducer;

