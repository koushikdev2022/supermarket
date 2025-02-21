import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../stores/api';
import errorHandler from '../stores/errorHandler';

export const getCartItemList = createAsyncThunk(
    'getlist/getCartItemList',
    async (userInput, { rejectWithValue }) => {
        try {


            const response = await api.post('/user-cart/get-cart-items', userInput);

            if (response?.status === 200) {
                return { data: response?.data, status: response.status };
            } else {
                return rejectWithValue(response?.data)
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
);


export const placeOrder = createAsyncThunk(
    'placeOrder/placeOrder',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/order/place-order', userInput);
            if (response?.data?.status_code === 201) {
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


//  Cart Item slice
const getCartItemSlice = createSlice({
    name: 'getlist',
    initialState: {
        data: [], // To store the user list data
        loading: false,
        error: null,
        placeOrdersData: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartItemList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartItemList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload?.data; // Store API response here
            })
            .addCase(getCartItemList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            }).addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = false
            })
            .addCase(placeOrder.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.placeOrdersData = payload
                state.error = false
            })
            .addCase(placeOrder.rejected, (state, { payload }) => {
                state.loading = false;
                state.message =
                    payload.payload !== undefined && payload.payload.message
                        ? payload.payload.message
                        : 'Something went wrong. Try again later.';
            })

            ;
    },
});

// Export the reducer
export default getCartItemSlice.reducer;
